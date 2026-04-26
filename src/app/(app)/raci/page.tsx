"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { RaciMatrix } from "@/components/RaciMatrix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allControls } from "@/data";

export default function RaciPage() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedControl, setSelectedControl] = useState("");

  const domains = [...new Set(allControls.map((c) => c.domain))];
  const filteredControls = selectedDomain ? allControls.filter((c) => c.domain === selectedDomain) : allControls;

  const displayControl = selectedControl
    ? allControls.find((c) => c.id === selectedControl)
    : null;

  const allActivities = useMemo(() => {
    const controls = displayControl ? [displayControl] : filteredControls;
    return controls.flatMap((ctrl) =>
      ctrl.raciMatrix.map((item) => ({
        ...item,
        activity: `[${ctrl.controlNumber}] ${item.activity}`,
      }))
    );
  }, [displayControl, filteredControls]);

  return (
    <div className="flex flex-col">
      <AppHeader
        title="RACI Library"
        subtitle="Cross-control accountability matrix"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedDomain}
            onChange={(e) => { setSelectedDomain(e.target.value); setSelectedControl(""); }}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Domains</option>
            {domains.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select
            value={selectedControl}
            onChange={(e) => setSelectedControl(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-48"
          >
            <option value="">All Controls</option>
            {filteredControls.map((c) => (
              <option key={c.id} value={c.id}>{c.controlNumber} – {c.title}</option>
            ))}
          </select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {displayControl
                ? `RACI for ${displayControl.controlNumber} – ${displayControl.title}`
                : `RACI Matrix – ${allActivities.length} activities across ${filteredControls.length} controls`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            {allActivities.length > 0 ? (
              <RaciMatrix items={allActivities} />
            ) : (
              <div className="py-12 text-center text-slate-400">No RACI data available for the selected filters.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
