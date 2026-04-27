"use client";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MaturityBadge } from "@/components/MaturityBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge, EvidenceBadge } from "@/components/StatusBadge";
import { DOMAIN_COLORS, cn } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import type { Control, Criticality } from "@/types";

const CRITICALITY_STYLES: Record<Criticality, string> = {
  "Critical": "bg-red-100 text-red-700",
  "High": "bg-orange-100 text-orange-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700",
  "Not Applicable": "bg-slate-100 text-slate-500",
};

interface ControlCardProps {
  control: Control;
  compact?: boolean;
}

export function ControlCard({ control, compact = false }: ControlCardProps) {
  const hasGap = control.targetMaturity > control.currentMaturity;
  const { getOverride } = useOverrides();
  const override = getOverride(control.id);
  const criticality = override?.criticality;

  return (
    <Link href={`/framework/${control.id}`}>
      <Card className="hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group h-full">
        <CardContent className="p-4 flex flex-col gap-3 h-full">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {control.controlNumber}
                </span>
                <PriorityBadge priority={control.priority} />
                {hasGap && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <AlertTriangle className="h-3 w-3" /> Gap
                  </span>
                )}
                {criticality && (
                  <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full", CRITICALITY_STYLES[criticality])}>
                    <Flame className="h-3 w-3" />{criticality}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                {control.title}
              </h3>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
          </div>

          {!compact && (
            <p className="text-xs text-slate-500 line-clamp-2 flex-1">
              {override?.plainEnglishInterpretation ?? control.plainEnglishInterpretation}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-slate-50">
            <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", DOMAIN_COLORS[control.domain] ?? "bg-slate-100 text-slate-700")}>
              {control.domain}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">Current</span>
              <MaturityBadge level={control.currentMaturity} showLabel={false} size="sm" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">Target</span>
              <MaturityBadge level={control.targetMaturity} showLabel={false} size="sm" />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <StatusBadge status={control.implementationStatus} />
            <EvidenceBadge status={control.evidenceReadiness} />
          </div>

          <div className="text-xs text-slate-500">
            <span className="font-medium">Owner:</span> {control.primaryOwner}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
