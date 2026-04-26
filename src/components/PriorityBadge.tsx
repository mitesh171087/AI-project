import { cn } from "@/lib/utils";
import { PRIORITY_COLORS } from "@/lib/utils";
import type { Priority } from "@/types";

interface PriorityBadgeProps {
  priority: Priority;
  showLabel?: boolean;
}

const PRIORITY_SHORT: Record<Priority, string> = {
  P1: "P1 – Critical",
  P2: "P2 – Important",
  P3: "P3 – Standard",
};

export function PriorityBadge({ priority, showLabel = false }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        PRIORITY_COLORS[priority]
      )}
    >
      {showLabel ? PRIORITY_SHORT[priority] : priority}
    </span>
  );
}
