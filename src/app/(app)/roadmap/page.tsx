"use client";
import { useMemo } from "react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allControls, uniqueDomains } from "@/data";
import { exportToCSV } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import { Download, CheckSquare, Square, CheckCircle2 } from "lucide-react";
import type { RoadmapItem } from "@/types";

const PHASE_LABELS = [
  "Mobilise & Assess",
  "Design Governance & Controls",
  "Implement People / Process / Technology",
  "Operate & Evidence",
  "Test, Remediate & Prepare for SAMA Review",
];

type EnrichedItem = RoadmapItem & { controlId: string; controlNumber: string; controlTitle: string; domain: string };

export default function RoadmapPage() {
  const [domainFilter, setDomainFilter] = useState("");
  const { overrides, updateControl } = useOverrides();

  const allItems: EnrichedItem[] = useMemo(() =>
    allControls
      .filter((c) => !domainFilter || c.domain === domainFilter)
      .flatMap((ctrl) =>
        ctrl.roadmap.map((item) => ({
          ...item,
          controlId: ctrl.id,
          controlNumber: ctrl.controlNumber,
          controlTitle: ctrl.title,
          domain: ctrl.domain,
        }))
      ),
    [domainFilter]
  );

  const isCompleted = (item: EnrichedItem) =>
    !!(overrides[item.controlId]?.roadmapCompletions?.[item.id]);

  const toggleComplete = (item: EnrichedItem) => {
    const existing = overrides[item.controlId]?.roadmapCompletions ?? {};
    updateControl(item.controlId, {
      roadmapCompletions: { ...existing, [item.id]: !existing[item.id] },
    });
  };

  const phaseItems: Record<number, EnrichedItem[]> = {};
  for (let p = 1; p <= 5; p++) phaseItems[p] = allItems.filter((i) => i.phase === p);

  const totalCompleted = allItems.filter(isCompleted).length;

  const handleExport = () => {
    exportToCSV(
      allItems.map((i) => ({
        Control: i.controlNumber,
        Title: i.controlTitle,
        Domain: i.domain,
        Phase: i.phase,
        "Phase Label": i.phaseLabel,
        Timeline: i.timeline,
        Activity: i.activity,
        Owner: i.owner,
        Dependency: i.dependency,
        Deliverable: i.deliverable,
        "Evidence Produced": i.evidenceProduced,
        Completed: isCompleted(i) ? "Yes" : "No",
      })),
      "sama-itgf-roadmap.csv"
    );
  };

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Roadmap Generator"
        subtitle={`Phased implementation roadmap · ${totalCompleted} / ${allItems.length} activities completed`}
        actions={
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Roadmap
          </Button>
        }
      />
      <div className="p-6 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600">
            <option value="">All Domains</option>
            {uniqueDomains.map((d) => <option key={d}>{d}</option>)}
          </select>
          <span className="text-xs text-slate-400">
            Check activities as you complete them — progress is saved automatically.
          </span>
        </div>

        {/* Phase summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((phase) => {
            const items = phaseItems[phase] ?? [];
            const done = items.filter(isCompleted).length;
            const pct = items.length ? Math.round((done / items.length) * 100) : 0;
            return (
              <Card key={phase} className="text-center">
                <CardContent className="p-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2 text-white"
                    style={{ backgroundColor: pct === 100 ? "#006B3F" : "#3b82f6" }}>
                    {pct === 100 ? <CheckCircle2 className="h-4 w-4" /> : phase}
                  </div>
                  <p className="text-xs font-medium text-slate-700 line-clamp-2">{PHASE_LABELS[phase - 1]}</p>
                  <p className="text-base font-bold text-slate-900 mt-1">{done}/{items.length}</p>
                  <p className="text-xs text-slate-400">completed</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Phase-by-phase roadmap */}
        {[1, 2, 3, 4, 5].map((phase) => {
          const items = phaseItems[phase] ?? [];
          if (items.length === 0) return null;
          const done = items.filter(isCompleted).length;
          return (
            <Card key={phase}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: "#006B3F" }}>{phase}</div>
                  Phase {phase}: {PHASE_LABELS[phase - 1]}
                  <span className="text-sm font-normal text-slate-500 ml-auto">{done}/{items.length} done</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide w-8"></th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Control</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Timeline</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Activity</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Owner</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Deliverable</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => {
                        const done = isCompleted(item);
                        return (
                          <tr key={item.id} className={`border-b border-slate-100 transition-colors ${done ? "bg-green-50/40" : i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                            <td className="p-2">
                              <button
                                onClick={() => toggleComplete(item)}
                                className="text-slate-400 hover:text-green-600 transition-colors"
                                title={done ? "Mark as incomplete" : "Mark as complete"}
                              >
                                {done
                                  ? <CheckSquare className="h-4 w-4 text-green-600" />
                                  : <Square className="h-4 w-4" />}
                              </button>
                            </td>
                            <td className="p-2">
                              <span className="text-xs font-mono font-bold" style={{ color: "#006B3F" }}>{item.controlNumber}</span>
                            </td>
                            <td className={`p-2 text-xs whitespace-nowrap ${done ? "text-slate-400 line-through" : "text-slate-600"}`}>{item.timeline}</td>
                            <td className={`p-2 text-sm font-medium ${done ? "text-slate-400 line-through" : "text-slate-800"}`}>{item.activity}</td>
                            <td className={`p-2 text-xs ${done ? "text-slate-400" : "text-slate-600"}`}>{item.owner}</td>
                            <td className={`p-2 text-xs ${done ? "text-slate-400 line-through" : "text-slate-600"}`}>{item.deliverable}</td>
                            <td className={`p-2 text-xs ${done ? "text-slate-400" : "text-slate-600"}`}>{item.evidenceProduced}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
