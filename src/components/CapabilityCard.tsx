import { Card, CardContent } from "@/components/ui/card";
import { MaturityBadge } from "@/components/MaturityBadge";
import { Cpu, User, Wrench, Link } from "lucide-react";
import type { Capability } from "@/types";

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Card className="border border-slate-100">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg p-2 bg-indigo-50">
              <Cpu className="h-4 w-4 text-indigo-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">{capability.name}</h4>
          </div>
          <MaturityBadge level={capability.targetMaturity} showLabel={false} size="sm" />
        </div>

        <p className="text-sm text-slate-600">{capability.description}</p>

        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <User className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span><span className="font-medium">Owner:</span> {capability.owner}</span>
          </div>
          {capability.relatedTools.length > 0 && (
            <div className="flex items-start gap-2 text-slate-500">
              <Wrench className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
              <span><span className="font-medium">Tools:</span> {capability.relatedTools.join(", ")}</span>
            </div>
          )}
          {capability.dependencies.length > 0 && (
            <div className="flex items-start gap-2 text-slate-500">
              <Link className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
              <span><span className="font-medium">Depends on:</span> {capability.dependencies.join(", ")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
