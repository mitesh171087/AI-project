"use client";
import { useState } from "react";
import { EvidenceBadge } from "@/components/StatusBadge";
import { MaturityBadge } from "@/components/MaturityBadge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { exportToCSV } from "@/lib/utils";
import type { EvidenceItem, EvidenceStatus } from "@/types";

const TYPE_COLORS: Record<string, string> = {
  Document: "bg-blue-50 text-blue-700",
  Policy: "bg-indigo-50 text-indigo-700",
  Record: "bg-teal-50 text-teal-700",
  Report: "bg-violet-50 text-violet-700",
  Minutes: "bg-amber-50 text-amber-700",
  Log: "bg-slate-100 text-slate-700",
  Screenshot: "bg-pink-50 text-pink-700",
  Certificate: "bg-green-50 text-green-700",
};

interface EvidenceTableProps {
  items: EvidenceItem[];
  showControlColumn?: boolean;
  onStatusChange?: (id: string, status: EvidenceStatus) => void;
  exportFilename?: string;
}

export function EvidenceTable({ items, showControlColumn = false, onStatusChange, exportFilename = "evidence.csv" }: EvidenceTableProps) {
  const [statuses, setStatuses] = useState<Record<string, EvidenceStatus>>({});

  const getStatus = (item: EvidenceItem) => statuses[item.id] ?? item.status;

  const handleStatusChange = (id: string, status: EvidenceStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
    onStatusChange?.(id, status);
  };

  const handleExport = () => {
    exportToCSV(
      items.map((ev) => ({
        Name: ev.name,
        Description: ev.description,
        Type: ev.type,
        Owner: ev.owner,
        Frequency: ev.updateFrequency,
        "Maturity Level": ev.maturityLevelSupported,
        Status: getStatus(ev),
        ...(showControlColumn ? { "Control ID": ev.controlId ?? "" } : {}),
      })),
      exportFilename
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Evidence</th>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Type</th>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Owner</th>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Frequency</th>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Maturity</th>
              <th className="text-left p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ev, i) => (
              <tr key={ev.id} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                <td className="p-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{ev.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{ev.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[ev.type] ?? "bg-slate-100 text-slate-700"}`}>
                    {ev.type}
                  </span>
                </td>
                <td className="p-3 text-xs text-slate-600">{ev.owner}</td>
                <td className="p-3 text-xs text-slate-600">{ev.updateFrequency}</td>
                <td className="p-3">
                  <MaturityBadge level={ev.maturityLevelSupported} showLabel={false} size="sm" />
                </td>
                <td className="p-3">
                  <select
                    value={getStatus(ev)}
                    onChange={(e) => handleStatusChange(ev.id, e.target.value as EvidenceStatus)}
                    className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {(["Missing", "Partial", "Available", "Verified"] as EvidenceStatus[]).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
