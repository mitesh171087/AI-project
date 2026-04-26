"use client";
import { useState } from "react";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/utils";
import { Download, Users, Settings, Monitor } from "lucide-react";
import type { Action, ActionCategory } from "@/types";

const CATEGORY_ICONS: Record<ActionCategory, React.ReactNode> = {
  People: <Users className="h-3.5 w-3.5" />,
  Process: <Settings className="h-3.5 w-3.5" />,
  Technology: <Monitor className="h-3.5 w-3.5" />,
};

const CATEGORY_COLORS: Record<ActionCategory, string> = {
  People: "bg-violet-100 text-violet-700",
  Process: "bg-teal-100 text-teal-700",
  Technology: "bg-blue-100 text-blue-700",
};

export function ActionTable({ actions, controlTitle }: { actions: Action[]; controlTitle: string }) {
  const [filter, setFilter] = useState<ActionCategory | "All">("All");

  const filtered = filter === "All" ? actions : actions.filter((a) => a.category === filter);

  const handleExport = () => {
    exportToCSV(
      filtered.map((a) => ({
        Category: a.category,
        Title: a.title,
        Description: a.description,
        Owner: a.owner,
        Stakeholders: a.stakeholders.join("; "),
        Priority: a.priority,
        Effort: a.effort,
        Dependency: a.dependency,
        "Evidence Produced": a.evidenceProduced,
      })),
      `${controlTitle}-actions.csv`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1.5">
          {(["All", "People", "Process", "Technology"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((action) => (
          <div key={action.id} className="rounded-lg border border-slate-100 p-4 bg-slate-50/50 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_COLORS[action.category]}`}>
                  {CATEGORY_ICONS[action.category]}
                  {action.category}
                </span>
                <PriorityBadge priority={action.priority} />
              </div>
              <span className="text-xs text-slate-500 bg-white border border-slate-100 rounded px-2 py-0.5">
                Effort: <span className="font-medium text-slate-700">{action.effort}</span>
              </span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{action.title}</h4>
              <p className="text-sm text-slate-600">{action.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600">
              <div><span className="font-medium text-slate-700">Owner:</span> {action.owner}</div>
              <div><span className="font-medium text-slate-700">Dependency:</span> {action.dependency}</div>
              <div className="col-span-2"><span className="font-medium text-slate-700">Stakeholders:</span> {action.stakeholders.join(", ")}</div>
              <div className="col-span-2"><span className="font-medium text-slate-700">Evidence produced:</span> {action.evidenceProduced}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
