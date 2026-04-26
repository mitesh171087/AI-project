import { cn } from "@/lib/utils";
import { MATURITY_BG, MATURITY_LABELS } from "@/lib/utils";
import type { MaturityLevel } from "@/types";

interface MaturityBadgeProps {
  level: MaturityLevel;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function MaturityBadge({ level, showLabel = true, size = "md" }: MaturityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        MATURITY_BG[level],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className="font-bold">L{level}</span>
      {showLabel && <span>– {MATURITY_LABELS[level]}</span>}
    </span>
  );
}
