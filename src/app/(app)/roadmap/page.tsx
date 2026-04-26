"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allControls, uniqueDomains, uniqueOwners } from "@/data";
import { exportToCSV } from "@/lib/utils";
import { Download } from "lucide-react";
import type { RoadmapItem } from "@/types";

export default function RoadmapPage() {
  const [groupBy, setGroupBy] = useState<"phase" | "domain" | "owner" | "priority">("phase");
  const [domainFilter, setDomainFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const allItems: (RoadmapItem & { controlNumber: string; controlTitle: string; domain: string; priority: string })[] = useMemo(() => {
    return allControls
      .filter((c) => (!domainFilter || c.domain === domainFilter) && (!priorityFilter || c.priority === priorityFilter))
      .flatMap((ctrl) =>
        ctrl.roadmap.map((item) => ({
          ...item,
          controlNumber: ctrl.controlNumber,
          controlTitle: ctrl.title,
          domain: ctrl.domain,
          priority: ctrl.priority,
        }))
      );
  }, [domainFilter, priorityFilter]);

  const handleExport = () => {
    exportToCSV(
      allItems.map((i) => ({
        Control: i.controlNumber,
        Title: i.controlTitle,
        Domain: i.domain,
        Priority: i.priority,
        Phase: i.phase,
        "Phase Label": i.phaseLabel,
        Timeline: i.timeline,
        Activity: i.activity,
        Owner: i.owner,
        Dependency: i.dependency,
        Deliverable: i.deliverable,
        "Evidence Produced": i.evidenceProduced,
      })),
      "sama-itgf-roadmap.csv"
    );
  };

  const phaseItems: Record<number, typeof allItems> = {};
  for (let p = 1; p <= 5; p++) phaseItems[p] = allItems.filter((i) => i.phase === p);

  const PHASE_LABELS = [
    "Mobilise & Assess",
    "Design Governance & Controls",
    "Implement People / Process / Technology",
    "Operate & Evidence",
    "Test, Remediate & Prepare for SAMA Review",
  ];

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Roadmap Generator"
        subtitle="Phased implementation roadmap across all SAMA ITGF controls"
        actions={
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Roadmap
          </Button>
        }
      />
      <div className="p-6 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Domains</option>
            {uniqueDomains.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Priorities</option>
            <option value="P1">P1 – Critical</option>
            <option value="P2">P2 – Important</option>
            <option value="P3">P3 – Standard</option>
          </select>
        </div>

        {/* Phase summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((phase) => (
            <Card key={phase} className="text-center">
              <CardContent className="p-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">{phase}</div>
                <p className="text-xs font-medium text-slate-700">{PHASE_LABELS[phase - 1]}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{phaseItems[phase]?.length ?? 0}</p>
                <p className="text-xs text-slate-400">activities</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phase-by-phase roadmap */}
        {[1, 2, 3, 4, 5].map((phase) => {
          const items = phaseItems[phase] ?? [];
          if (items.length === 0) return null;
          return (
            <Card key={phase}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{phase}</div>
                  Phase {phase}: {PHASE_LABELS[phase - 1]}
                  <span className="text-sm font-normal text-slate-500">– {items.length} activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Control</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Timeline</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Activity</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Owner</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Deliverable</th>
                        <th className="text-left p-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <tr key={item.id} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                          <td className="p-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-mono font-bold text-blue-700">{item.controlNumber}</span>
                              <PriorityBadge priority={item.priority as "P1" | "P2" | "P3"} />
                            </div>
                          </td>
                          <td className="p-2 text-xs text-slate-600 whitespace-nowrap">{item.timeline}</td>
                          <td className="p-2 text-sm font-medium text-slate-800">{item.activity}</td>
                          <td className="p-2 text-xs text-slate-600">{item.owner}</td>
                          <td className="p-2 text-xs text-slate-600">{item.deliverable}</td>
                          <td className="p-2 text-xs text-slate-600">{item.evidenceProduced}</td>
                        </tr>
                      ))}
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
