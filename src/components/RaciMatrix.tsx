"use client";
import type { RaciItem, RaciRole } from "@/types";

const ROLE_LABELS = [
  { key: "boardTechnologyCommittee" as const, short: "Board TC", full: "Board Technology Committee" },
  { key: "cio" as const, short: "CIO", full: "Chief Information Officer" },
  { key: "cto" as const, short: "CTO", full: "Chief Technology Officer" },
  { key: "itGovernanceHead" as const, short: "IT Gov", full: "IT Governance Head" },
  { key: "itRiskManager" as const, short: "IT Risk", full: "IT Risk Manager" },
  { key: "ciso" as const, short: "CISO", full: "Chief Information Security Officer" },
  { key: "enterpriseArchitect" as const, short: "EA", full: "Enterprise Architect" },
  { key: "itOperationsHead" as const, short: "IT Ops", full: "IT Operations Head" },
  { key: "applicationOwner" as const, short: "App Owner", full: "Application Owner" },
  { key: "infrastructureOwner" as const, short: "Infra", full: "Infrastructure Owner" },
  { key: "complianceOfficer" as const, short: "Compliance", full: "Compliance Officer" },
  { key: "internalAudit" as const, short: "Audit", full: "Internal Audit" },
  { key: "pmo" as const, short: "PMO", full: "Project Management Office" },
  { key: "vendorManager" as const, short: "Vendor", full: "Vendor Manager" },
];

const RACI_COLORS: Record<string, string> = {
  R: "bg-blue-100 text-blue-800 font-bold",
  A: "bg-purple-100 text-purple-800 font-bold",
  C: "bg-amber-100 text-amber-800",
  I: "bg-slate-100 text-slate-600",
  "-": "bg-white text-slate-300",
  "R/A": "bg-indigo-100 text-indigo-800 font-bold",
  "A/C": "bg-fuchsia-100 text-fuchsia-800",
  "R/C": "bg-cyan-100 text-cyan-800",
  "C/I": "bg-orange-100 text-orange-700",
};

export function RaciMatrix({ items }: { items: RaciItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left p-3 font-semibold text-slate-700 w-48 min-w-[12rem] sticky left-0 bg-slate-50 border-r border-slate-200">
              Activity
            </th>
            {ROLE_LABELS.map((r) => (
              <th key={r.key} className="p-2 font-medium text-slate-600 text-center whitespace-nowrap min-w-[60px]" title={r.full}>
                {r.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
              <td className="p-3 text-slate-700 text-xs font-medium sticky left-0 bg-inherit border-r border-slate-100 max-w-[12rem]">
                {item.activity}
              </td>
              {ROLE_LABELS.map((r) => {
                const val = item[r.key] as RaciRole;
                return (
                  <td key={r.key} className="p-2 text-center">
                    <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 text-xs ${RACI_COLORS[val] ?? "bg-white text-slate-400"}`}>
                      {val}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-3 p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        {Object.entries({ R: "Responsible", A: "Accountable", C: "Consulted", I: "Informed" }).map(([k, v]) => (
          <span key={k} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded ${RACI_COLORS[k]}`}>
            <span className="font-bold">{k}</span> – {v}
          </span>
        ))}
      </div>
    </div>
  );
}
