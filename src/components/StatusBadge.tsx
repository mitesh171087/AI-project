import { cn } from "@/lib/utils";
import { STATUS_COLORS, EVIDENCE_COLORS } from "@/lib/utils";
import type { ImplementationStatus, EvidenceStatus } from "@/types";

export function StatusBadge({ status }: { status: ImplementationStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[status])}>
      {status}
    </span>
  );
}

export function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", EVIDENCE_COLORS[status])}>
      {status}
    </span>
  );
}
