"use client";
import { useState, useMemo, useCallback } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MaturityBadge } from "@/components/MaturityBadge";
import { StatusBadge, EvidenceBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { allControls } from "@/data";
import { exportToCSV, MATURITY_COLORS, CRITICALITY_STYLES, cn } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import {
  Download, TrendingUp, AlertTriangle, ChevronDown, ChevronUp,
  Save, CheckCircle2, Clock, Flame, Printer, CalendarX,
} from "lucide-react";
import type { Control, MaturityLevel, ImplementationStatus, EvidenceStatus, AuditTrailEntry, Criticality } from "@/types";

interface DraftRow {
  currentMaturity: MaturityLevel;
  targetMaturity: MaturityLevel;
  implementationStatus: ImplementationStatus;
  evidenceReadiness: EvidenceStatus;
  owner: string;
  keyGaps: string;
  remediationAction: string;
  targetDate: string;
}

function formatTs(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

function fieldLabel(key: string): string {
  const map: Record<string, string> = {
    currentMaturity: "Current Maturity",
    targetMaturity: "Target Maturity",
    implementationStatus: "Status",
    evidenceReadiness: "Evidence",
    owner: "Owner",
    keyGaps: "Key Gaps",
    remediationAction: "Remediation Action",
    targetDate: "Target Date",
  };
  return map[key] ?? key;
}

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

function isOverdue(targetDate: string, status: ImplementationStatus) {
  if (!targetDate || status === "Implemented") return false;
  const d = new Date(targetDate);
  return d < TODAY;
}

export default function AssessmentPage() {
  const { overrides, updateControl, getOverride } = useOverrides();

  const [drafts, setDrafts] = useState<Record<string, Partial<DraftRow>>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState<string | null>(null);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  const getSaved = useCallback((ctrl: Control): DraftRow => {
    const o = getOverride(ctrl.id);
    return {
      currentMaturity: o?.currentMaturity ?? ctrl.currentMaturity,
      targetMaturity: o?.targetMaturity ?? ctrl.targetMaturity,
      implementationStatus: o?.implementationStatus ?? ctrl.implementationStatus,
      evidenceReadiness: o?.evidenceReadiness ?? ctrl.evidenceReadiness,
      owner: o?.owner ?? ctrl.primaryOwner,
      keyGaps: o?.keyGaps ?? "",
      remediationAction: o?.remediationAction ?? "",
      targetDate: o?.targetDate ?? "",
    };
  }, [overrides]);

  const getDraft = useCallback((ctrl: Control): DraftRow => {
    return { ...getSaved(ctrl), ...drafts[ctrl.id] };
  }, [drafts, getSaved]);

  const isDirty = useCallback((ctrl: Control): boolean => {
    const d = drafts[ctrl.id];
    if (!d || Object.keys(d).length === 0) return false;
    const s = getSaved(ctrl);
    return (Object.keys(d) as (keyof DraftRow)[]).some((k) => String(d[k]) !== String(s[k]));
  }, [drafts, getSaved]);

  const setDraftField = (ctrlId: string, field: keyof DraftRow, value: string | number) => {
    setDrafts((prev) => ({
      ...prev,
      [ctrlId]: { ...prev[ctrlId], [field]: value },
    }));
  };

  const handleSave = useCallback((ctrl: Control) => {
    const draft = getDraft(ctrl);
    const saved = getSaved(ctrl);
    const note = notes[ctrl.id] ?? "";

    const changes: Record<string, { from: string; to: string }> = {};
    (Object.keys(draft) as (keyof DraftRow)[]).forEach((k) => {
      if (String(draft[k]) !== String(saved[k])) {
        changes[k] = { from: String(saved[k] ?? ""), to: String(draft[k] ?? "") };
      }
    });

    const existingTrail = getOverride(ctrl.id)?.auditTrail ?? [];
    const entry: AuditTrailEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      note,
      changes,
    };

    updateControl(ctrl.id, {
      currentMaturity: draft.currentMaturity,
      targetMaturity: draft.targetMaturity,
      implementationStatus: draft.implementationStatus,
      evidenceReadiness: draft.evidenceReadiness,
      owner: draft.owner,
      keyGaps: draft.keyGaps,
      remediationAction: draft.remediationAction,
      targetDate: draft.targetDate,
      auditTrail: [...existingTrail, entry],
    });

    setDrafts((prev) => { const n = { ...prev }; delete n[ctrl.id]; return n; });
    setNotes((prev) => { const n = { ...prev }; delete n[ctrl.id]; return n; });
    setSavedFlash(ctrl.id);
    setTimeout(() => setSavedFlash(null), 2000);
  }, [drafts, notes, getSaved, getOverride, updateControl]);

  const avgCurrent = useMemo(() => {
    const total = allControls.reduce((sum, c) => sum + getDraft(c).currentMaturity, 0);
    return Math.round((total / allControls.length) * 10) / 10;
  }, [overrides, drafts]);

  const gapCount = useMemo(() =>
    allControls.filter((c) => getDraft(c).targetMaturity > getDraft(c).currentMaturity).length,
    [overrides, drafts]
  );

  const missingCount = useMemo(() =>
    allControls.filter((c) => ["Missing", "Partial"].includes(getDraft(c).evidenceReadiness)).length,
    [overrides, drafts]
  );

  const assessedCount = useMemo(() =>
    allControls.filter((c) => !!(getOverride(c.id)?.auditTrail?.length)),
    [overrides]
  ).length;

  const overdueControls = useMemo(() =>
    allControls.filter((c) => {
      const row = getSaved(c);
      return isOverdue(row.targetDate, row.implementationStatus);
    }),
    [overrides]
  );

  const maturityDistribution = [1, 2, 3, 4, 5].map((level) => ({
    level: `L${level}`,
    count: allControls.filter((c) => getDraft(c).currentMaturity === level).length,
    fill: MATURITY_COLORS[level as MaturityLevel],
  }));

  const displayControls = showOverdueOnly ? overdueControls : allControls;

  const handleExport = () => {
    exportToCSV(
      allControls.map((ctrl) => {
        const row = getDraft(ctrl);
        const o = getOverride(ctrl.id);
        return {
          "Control Number": ctrl.controlNumber,
          Title: ctrl.title,
          Domain: ctrl.domain,
          Criticality: o?.criticality ?? "Not Set",
          "Current Maturity": row.currentMaturity,
          "Target Maturity": row.targetMaturity,
          "Implementation Status": row.implementationStatus,
          "Evidence Readiness": row.evidenceReadiness,
          "Key Gaps": row.keyGaps,
          "Remediation Action": row.remediationAction,
          Owner: row.owner,
          "Target Date": row.targetDate,
        };
      }),
      "sama-itgf-assessment.csv"
    );
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Maturity Assessment"
        subtitle={`${allControls.length} controls · Click a row to expand, edit, and save`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="print:hidden">
              <Printer className="h-4 w-4" /> Print Report
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} className="print:hidden">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        }
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Average Maturity</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">L{avgCurrent}</p>
              <Progress value={(avgCurrent / 5) * 100} className="mt-3" />
              <p className="text-xs text-slate-400 mt-1">{avgCurrent} / 5.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Assessment Progress</p>
              <p className="text-3xl font-bold text-slate-900">{assessedCount}<span className="text-lg text-slate-400 font-normal"> / {allControls.length}</span></p>
              <Progress
                value={(assessedCount / allControls.length) * 100}
                className="mt-1"
              />
              <p className="text-xs text-slate-400">controls assessed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Maturity Gaps
              </p>
              <p className="text-3xl font-bold text-amber-600">{gapCount}</p>
              <p className="text-xs text-slate-400">controls below target</p>
            </CardContent>
          </Card>
          <Card
            className={cn(overdueControls.length > 0 ? "border-red-200 bg-red-50/30" : "")}
          >
            <CardContent className="p-5 flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <CalendarX className="h-3.5 w-3.5 text-red-500" /> Overdue
              </p>
              <p className={cn("text-3xl font-bold", overdueControls.length > 0 ? "text-red-600" : "text-slate-400")}>
                {overdueControls.length}
              </p>
              <p className="text-xs text-slate-400">remediation targets missed</p>
            </CardContent>
          </Card>
        </div>

        {/* Overdue filter chip */}
        {overdueControls.length > 0 && (
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => setShowOverdueOnly((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                showOverdueOnly
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-slate-600 border-slate-200 hover:border-red-200 hover:text-red-600"
              )}
            >
              <CalendarX className="h-3.5 w-3.5" />
              {showOverdueOnly ? `Showing ${overdueControls.length} overdue controls` : `Show overdue only (${overdueControls.length})`}
            </button>
            {showOverdueOnly && (
              <button
                onClick={() => setShowOverdueOnly(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Show all
              </button>
            )}
          </div>
        )}

        {/* Chart */}
        <Card className="print:hidden">
          <CardHeader><CardTitle>Maturity Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={maturityDistribution} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {maturityDistribution.map((e) => <Cell key={e.level} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Assessment table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {showOverdueOnly ? `Overdue Controls (${overdueControls.length})` : "Control Assessment"}
            </CardTitle>
            <p className="text-sm text-slate-500 print:hidden">
              Change values inline, then expand a row and click Save to persist. Each save creates an audit trail entry.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide w-64">Control</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Criticality</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Current</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Target</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Evidence</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Owner</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide w-20 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {displayControls.map((ctrl, i) => {
                    const row = getDraft(ctrl);
                    const saved = getSaved(ctrl);
                    const isOpen = expandedId === ctrl.id;
                    const dirty = isDirty(ctrl);
                    const flashed = savedFlash === ctrl.id;
                    const criticality = getOverride(ctrl.id)?.criticality;
                    const auditTrail = getOverride(ctrl.id)?.auditTrail ?? [];
                    const hasGap = row.targetMaturity > row.currentMaturity;
                    const overdue = isOverdue(saved.targetDate, saved.implementationStatus);

                    return (
                      <>
                        <tr
                          key={ctrl.id}
                          className={cn(
                            "border-b border-slate-100 cursor-pointer transition-colors",
                            isOpen ? "bg-emerald-50" : i % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/30 hover:bg-slate-100"
                          )}
                          onClick={() => setExpandedId(isOpen ? null : ctrl.id)}
                        >
                          <td className="p-3">
                            <div>
                              <span className="text-xs font-mono font-bold" style={{ color: "#006B3F" }}>
                                {ctrl.controlNumber}
                              </span>
                              <p className="text-sm text-slate-800 font-medium leading-snug">{ctrl.title}</p>
                              <p className="text-xs text-slate-400">{ctrl.domain.replace("Information Technology Governance and Leadership", "IT Gov & Leadership")}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            {criticality ? (
                              <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full", CRITICALITY_STYLES[criticality as Criticality])}>
                                <Flame className="h-3 w-3" />{criticality}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-300">—</span>
                            )}
                          </td>
                          <td className="p-3">
                            <select
                              value={row.currentMaturity}
                              onChange={(e) => { e.stopPropagation(); setDraftField(ctrl.id, "currentMaturity", Number(e.target.value) as MaturityLevel); }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-green-600 print:border-0 print:bg-transparent"
                            >
                              {[1, 2, 3, 4, 5].map((l) => <option key={l} value={l}>L{l}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {hasGap && <span className="text-amber-500 font-bold text-xs">!</span>}
                              <select
                                value={row.targetMaturity}
                                onChange={(e) => { e.stopPropagation(); setDraftField(ctrl.id, "targetMaturity", Number(e.target.value) as MaturityLevel); }}
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-green-600 print:border-0 print:bg-transparent"
                              >
                                {[1, 2, 3, 4, 5].map((l) => <option key={l} value={l}>L{l}</option>)}
                              </select>
                            </div>
                          </td>
                          <td className="p-3">
                            <select
                              value={row.implementationStatus}
                              onChange={(e) => { e.stopPropagation(); setDraftField(ctrl.id, "implementationStatus", e.target.value as ImplementationStatus); }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-green-600 print:border-0 print:bg-transparent"
                            >
                              {["Not Started", "In Progress", "Implemented", "Needs Review"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            <select
                              value={row.evidenceReadiness}
                              onChange={(e) => { e.stopPropagation(); setDraftField(ctrl.id, "evidenceReadiness", e.target.value as EvidenceStatus); }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-green-600 print:border-0 print:bg-transparent"
                            >
                              {["Missing", "Partial", "Available", "Verified"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs text-slate-600 max-w-[120px] truncate">{row.owner}</span>
                              {row.targetDate && (
                                <span className={cn(
                                  "text-[10px]",
                                  overdue ? "text-red-600 font-semibold" : "text-slate-400"
                                )}>
                                  {overdue && "⚠ "}{row.targetDate}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 print:hidden">
                            <div className="flex items-center gap-1.5">
                              {flashed && (
                                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Saved
                                </span>
                              )}
                              {dirty && !flashed && (
                                <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 font-medium">
                                  <Clock className="h-3 w-3" /> Unsaved
                                </span>
                              )}
                              {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                            </div>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr key={`${ctrl.id}-expand`} className="print:hidden">
                            <td colSpan={8} className="bg-emerald-50 border-b border-emerald-100 p-4">
                              <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Key Gaps</label>
                                    <textarea
                                      value={row.keyGaps}
                                      onChange={(e) => setDraftField(ctrl.id, "keyGaps", e.target.value)}
                                      placeholder="Describe the key gaps for this control…"
                                      rows={3}
                                      className="text-sm border border-slate-200 rounded p-2 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-green-600"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Remediation Action</label>
                                    <textarea
                                      value={row.remediationAction}
                                      onChange={(e) => setDraftField(ctrl.id, "remediationAction", e.target.value)}
                                      placeholder="Describe the planned remediation actions…"
                                      rows={3}
                                      className="text-sm border border-slate-200 rounded p-2 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-green-600"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                      <label className="text-xs font-semibold text-slate-600">Owner</label>
                                      <input
                                        value={row.owner}
                                        onChange={(e) => setDraftField(ctrl.id, "owner", e.target.value)}
                                        className="text-sm border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <label className="text-xs font-semibold text-slate-600">Target Date</label>
                                      <input
                                        type="date"
                                        value={row.targetDate}
                                        onChange={(e) => setDraftField(ctrl.id, "targetDate", e.target.value)}
                                        className="text-sm border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                                      />
                                      {overdue && (
                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                          <CalendarX className="h-3 w-3" /> This target date has passed.
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-emerald-200 pt-3 flex flex-col gap-2">
                                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                    <Save className="h-3.5 w-3.5 text-green-700" />
                                    Progress Note <span className="font-normal text-slate-400">(optional — describe what was done or achieved)</span>
                                  </label>
                                  <div className="flex gap-3 items-start">
                                    <textarea
                                      value={notes[ctrl.id] ?? ""}
                                      onChange={(e) => setNotes((prev) => ({ ...prev, [ctrl.id]: e.target.value }))}
                                      placeholder="e.g. Completed root cause analysis, updated configuration baseline, received sign-off from CISO…"
                                      rows={2}
                                      className="flex-1 text-sm border border-slate-200 rounded p-2 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-green-600"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={(e) => { e.stopPropagation(); handleSave(ctrl); }}
                                      className="shrink-0 flex items-center gap-1.5"
                                      style={{ backgroundColor: "#006B3F" }}
                                    >
                                      <Save className="h-3.5 w-3.5" />
                                      Save Changes
                                    </Button>
                                  </div>
                                  {dirty && (
                                    <p className="text-xs text-amber-600 flex items-center gap-1">
                                      <Clock className="h-3 w-3" /> You have unsaved changes for this control.
                                    </p>
                                  )}
                                </div>

                                {auditTrail.length > 0 && (
                                  <div className="border-t border-emerald-200 pt-3">
                                    <p className="text-xs font-semibold text-slate-600 mb-2">Audit Trail</p>
                                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                      {[...auditTrail].reverse().map((entry) => (
                                        <div key={entry.id} className="bg-white border border-slate-100 rounded p-2.5 text-xs">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-slate-400">{formatTs(entry.timestamp)}</span>
                                            {entry.note && (
                                              <span className="text-slate-700 font-medium italic ml-2 truncate max-w-xs">"{entry.note}"</span>
                                            )}
                                          </div>
                                          {Object.entries(entry.changes).length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                              {Object.entries(entry.changes).map(([field, { from, to }]) => (
                                                <span key={field} className="bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">
                                                  <span className="text-slate-500">{fieldLabel(field)}: </span>
                                                  <span className="text-red-500 line-through">{from || "—"}</span>
                                                  <span className="text-slate-400"> → </span>
                                                  <span className="text-green-700 font-medium">{to || "—"}</span>
                                                </span>
                                              ))}
                                            </div>
                                          )}
                                          {Object.entries(entry.changes).length === 0 && (
                                            <span className="text-slate-400 italic">No field changes recorded.</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
