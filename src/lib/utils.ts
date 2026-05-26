import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  MaturityLevel,
  Priority,
  ImplementationStatus,
  EvidenceStatus,
  Criticality,
  Control,
  AllOverrides,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Maturity helpers ────────────────────────────────────────────────────────

export const MATURITY_LABELS: Record<MaturityLevel, string> = {
  1: "Initial",
  2: "Developing",
  3: "Defined",
  4: "Managed",
  5: "Optimised",
};

export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  1: "#ef4444",
  2: "#f97316",
  3: "#eab308",
  4: "#22c55e",
  5: "#3b82f6",
};

export const MATURITY_BG: Record<MaturityLevel, string> = {
  1: "bg-red-100 text-red-800",
  2: "bg-orange-100 text-orange-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-green-100 text-green-800",
  5: "bg-blue-100 text-blue-800",
};

// ─── Priority helpers ────────────────────────────────────────────────────────

export const PRIORITY_COLORS: Record<Priority, string> = {
  P1: "bg-red-100 text-red-800 border border-red-200",
  P2: "bg-amber-100 text-amber-800 border border-amber-200",
  P3: "bg-blue-100 text-blue-800 border border-blue-200",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  P1: "Priority 1 – Critical",
  P2: "Priority 2 – Important",
  P3: "Priority 3 – Standard",
};

// ─── Status helpers ──────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<ImplementationStatus, string> = {
  "Not Started": "bg-slate-100 text-slate-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Implemented: "bg-green-100 text-green-700",
  "Needs Review": "bg-amber-100 text-amber-700",
};

export const EVIDENCE_COLORS: Record<EvidenceStatus, string> = {
  Missing: "bg-red-100 text-red-700",
  Partial: "bg-amber-100 text-amber-700",
  Available: "bg-blue-100 text-blue-700",
  Verified: "bg-green-100 text-green-700",
};

// ─── Criticality styles (single source of truth) ────────────────────────────

export const CRITICALITY_STYLES: Record<Criticality, string> = {
  Critical: "bg-red-100 text-red-700 border border-red-200",
  High: "bg-orange-100 text-orange-700 border border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Low: "bg-green-100 text-green-700 border border-green-200",
  "Not Applicable": "bg-slate-100 text-slate-500 border border-slate-200",
};

// ─── Domain colours (for heatmap / tags) ────────────────────────────────────

export const DOMAIN_COLORS: Record<string, string> = {
  "Information Technology Governance and Leadership": "bg-indigo-100 text-indigo-800",
  "IT Risk Management": "bg-purple-100 text-purple-800",
  "Operations Management": "bg-cyan-100 text-cyan-800",
  "System Change Management": "bg-teal-100 text-teal-800",
};

// ─── CSV Export ──────────────────────────────────────────────────────────────

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((h) => {
        const val = row[h];
        const str = Array.isArray(val) ? val.join("; ") : String(val ?? "");
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Filter & search helpers ─────────────────────────────────────────────────

export function filterControls(
  controls: Control[],
  filters: {
    domain?: string;
    owner?: string;
    status?: string;
    evidenceReadiness?: string;
    maturity?: string;
    search?: string;
  },
  overrides: AllOverrides = {}
): Control[] {
  return controls.filter((ctrl) => {
    const o = overrides[ctrl.id];
    const effectiveStatus = o?.implementationStatus ?? ctrl.implementationStatus;
    const effectiveEvidence = o?.evidenceReadiness ?? ctrl.evidenceReadiness;
    const effectiveOwner = o?.owner ?? ctrl.primaryOwner;
    const effectiveTargetMaturity = o?.targetMaturity ?? ctrl.targetMaturity;

    if (filters.domain && ctrl.domain !== filters.domain) return false;
    if (filters.owner && effectiveOwner !== filters.owner) return false;
    if (filters.status && effectiveStatus !== filters.status) return false;
    if (filters.evidenceReadiness && effectiveEvidence !== filters.evidenceReadiness) return false;
    if (filters.maturity && effectiveTargetMaturity !== Number(filters.maturity)) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        ctrl.controlNumber.toLowerCase().includes(q) ||
        ctrl.title.toLowerCase().includes(q) ||
        ctrl.domain.toLowerCase().includes(q) ||
        ctrl.subdomain.toLowerCase().includes(q) ||
        ctrl.primaryOwner.toLowerCase().includes(q) ||
        ctrl.plainEnglishInterpretation.toLowerCase().includes(q) ||
        ctrl.requiredCapabilities.some((cap) =>
          cap.name.toLowerCase().includes(q)
        ) ||
        ctrl.evidenceChecklist.some((ev) =>
          ev.name.toLowerCase().includes(q)
        ) ||
        ctrl.auditQuestions.some((aq) =>
          aq.question.toLowerCase().includes(q)
        )
      );
    }
    return true;
  });
}

// ─── Maturity gap helpers (use override values when available) ───────────────

export function getMaturityGapControls(controls: Control[], overrides: AllOverrides = {}): Control[] {
  return controls.filter((c) => {
    const current = overrides[c.id]?.currentMaturity ?? c.currentMaturity;
    const target = overrides[c.id]?.targetMaturity ?? c.targetMaturity;
    return target > current;
  });
}

// ─── Compliance score (% of controls at or above target maturity) ────────────

export function getComplianceScore(controls: Control[], overrides: AllOverrides = {}): number {
  if (!controls.length) return 0;
  const compliant = controls.filter((c) => {
    const current = overrides[c.id]?.currentMaturity ?? c.currentMaturity;
    const target = overrides[c.id]?.targetMaturity ?? c.targetMaturity;
    return current >= target;
  }).length;
  return Math.round((compliant / controls.length) * 100);
}
