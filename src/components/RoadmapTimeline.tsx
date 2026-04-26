import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import type { RoadmapItem } from "@/types";

const PHASE_COLORS = [
  "bg-slate-600",
  "bg-blue-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-green-600",
];

const PHASE_BG = [
  "bg-slate-50 border-slate-200",
  "bg-blue-50 border-blue-100",
  "bg-violet-50 border-violet-100",
  "bg-teal-50 border-teal-100",
  "bg-green-50 border-green-100",
];

export function RoadmapTimeline({ items }: { items: RoadmapItem[] }) {
  const phases = [1, 2, 3, 4, 5] as const;
  const phaseItems = (p: number) => items.filter((i) => i.phase === p);

  return (
    <div className="flex flex-col gap-6">
      {phases.map((phase) => {
        const phaseGroup = phaseItems(phase);
        if (phaseGroup.length === 0) return null;
        const label = phaseGroup[0].phaseLabel;
        return (
          <div key={phase} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${PHASE_COLORS[phase - 1]} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                {phase}
              </div>
              {phase < 5 && <div className="w-0.5 flex-1 bg-slate-200 mt-2" />}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-bold text-slate-800">Phase {phase}: {label}</h4>
                {phaseGroup[0].timeline && (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" /> {phaseGroup[0].timeline}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {phaseGroup.map((item) => (
                  <div key={item.id} className={`rounded-lg border p-3 ${PHASE_BG[phase - 1]}`}>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{item.activity}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                          <div><span className="font-medium">Owner:</span> {item.owner}</div>
                          <div><span className="font-medium">Dependency:</span> {item.dependency}</div>
                          <div><span className="font-medium">Deliverable:</span> {item.deliverable}</div>
                          <div><span className="font-medium">Evidence:</span> {item.evidenceProduced}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
