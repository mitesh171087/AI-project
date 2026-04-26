"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MaturityBadge } from "@/components/MaturityBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge, EvidenceBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { allControls } from "@/data";
import { exportToCSV, MATURITY_COLORS } from "@/lib/utils";
import { Download, TrendingUp, AlertTriangle } from "lucide-react";
import type { Control, MaturityLevel, ImplementationStatus, EvidenceStatus } from "@/types";

interface AssessmentRow {
  currentMaturity: MaturityLevel;
  targetMaturity: MaturityLevel;
  implementationStatus: ImplementationStatus;
  evidenceReadiness: EvidenceStatus;
  keyGaps: string;
  remediationAction: string;
  owner: string;
  targetDate: string;
}

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState<Record<string, AssessmentRow>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getRow = (ctrl: Control): AssessmentRow =>
    assessments[ctrl.id] ?? {
      currentMaturity: ctrl.currentMaturity,
      targetMaturity: ctrl.targetMaturity,
      implementationStatus: ctrl.implementationStatus,
      evidenceReadiness: ctrl.evidenceReadiness,
      keyGaps: "",
      remediationAction: "",
      owner: ctrl.primaryOwner,
      targetDate: "",
    };

  const updateRow = (id: string, partial: Partial<AssessmentRow>) => {
    setAssessments((prev) => ({ ...prev, [id]: { ...getRow(allControls.find((c) => c.id === id)!), ...partial, ...prev[id], ...partial } }));
  };

  const maturityGapControls = useMemo(
    () => allControls.filter((c) => getRow(c).targetMaturity > getRow(c).currentMaturity),
    [assessments]
  );

  const missingEvidenceControls = useMemo(
    () => allControls.filter((c) => ["Missing", "Partial"].includes(getRow(c).evidenceReadiness)),
    [assessments]
  );

  const avgCurrent = useMemo(() => {
    const total = allControls.reduce((sum, c) => sum + getRow(c).currentMaturity, 0);
    return Math.round((total / allControls.length) * 10) / 10;
  }, [assessments]);

  const maturityDistribution = [1, 2, 3, 4, 5].map((level) => ({
    level: `L${level}`,
    count: allControls.filter((c) => getRow(c).currentMaturity === level).length,
    fill: MATURITY_COLORS[level as MaturityLevel],
  }));

  const handleExport = () => {
    exportToCSV(
      allControls.map((ctrl) => {
        const row = getRow(ctrl);
        return {
          "Control Number": ctrl.controlNumber,
          Title: ctrl.title,
          Domain: ctrl.domain,
          Priority: ctrl.priority,
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

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Maturity Assessment"
        subtitle="Assess your current state against SAMA ITGF controls"
        actions={
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Assessment
          </Button>
        }
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Average Maturity</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">L{avgCurrent}</p>
              <Progress value={(avgCurrent / 5) * 100} className="mt-3" />
              <p className="text-xs text-slate-400 mt-1">{avgCurrent} of 5.0 target</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Maturity Gaps
              </p>
              <p className="text-3xl font-bold text-amber-600">{maturityGapControls.length}</p>
              <p className="text-xs text-slate-400">controls below target</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" /> Missing Evidence
              </p>
              <p className="text-3xl font-bold text-red-600">{missingEvidenceControls.length}</p>
              <p className="text-xs text-slate-400">controls need evidence</p>
            </CardContent>
          </Card>
        </div>

        {/* Maturity distribution chart */}
        <Card>
          <CardHeader><CardTitle>Maturity Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={maturityDistribution} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
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
            <CardTitle>Control Assessment</CardTitle>
            <p className="text-sm text-slate-500">Click a row to expand and update the assessment details for each control.</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Control</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Priority</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Current</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Target</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Evidence</th>
                    <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {allControls.map((ctrl, i) => {
                    const row = getRow(ctrl);
                    const isOpen = expandedId === ctrl.id;
                    const hasGap = row.targetMaturity > row.currentMaturity;
                    return (
                      <>
                        <tr
                          key={ctrl.id}
                          className={`border-b border-slate-100 cursor-pointer transition-colors ${
                            isOpen ? "bg-blue-50" : i % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/30 hover:bg-slate-100"
                          }`}
                          onClick={() => setExpandedId(isOpen ? null : ctrl.id)}
                        >
                          <td className="p-3">
                            <div>
                              <span className="text-xs font-mono font-bold text-blue-700">{ctrl.controlNumber}</span>
                              <p className="text-sm text-slate-800 font-medium">{ctrl.title}</p>
                              <p className="text-xs text-slate-400">{ctrl.domain}</p>
                            </div>
                          </td>
                          <td className="p-3"><PriorityBadge priority={ctrl.priority} /></td>
                          <td className="p-3">
                            <select
                              value={row.currentMaturity}
                              onChange={(e) => { e.stopPropagation(); updateRow(ctrl.id, { currentMaturity: Number(e.target.value) as MaturityLevel }); }}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {[1, 2, 3, 4, 5].map((l) => <option key={l} value={l}>L{l}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            {hasGap && <span className="text-amber-500 font-bold mr-1">!</span>}
                            <MaturityBadge level={row.targetMaturity} showLabel={false} size="sm" />
                          </td>
                          <td className="p-3">
                            <select
                              value={row.implementationStatus}
                              onChange={(e) => { e.stopPropagation(); updateRow(ctrl.id, { implementationStatus: e.target.value as ImplementationStatus }); }}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {["Not Started", "In Progress", "Implemented", "Needs Review"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            <select
                              value={row.evidenceReadiness}
                              onChange={(e) => { e.stopPropagation(); updateRow(ctrl.id, { evidenceReadiness: e.target.value as EvidenceStatus }); }}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {["Missing", "Partial", "Available", "Verified"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-3 text-xs text-slate-600">{row.owner}</td>
                        </tr>
                        {isOpen && (
                          <tr key={`${ctrl.id}-expand`} className="bg-blue-50 border-b border-blue-100">
                            <td colSpan={7} className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                  <label className="text-xs font-medium text-slate-600">Key Gaps</label>
                                  <textarea
                                    value={row.keyGaps}
                                    onChange={(e) => updateRow(ctrl.id, { keyGaps: e.target.value })}
                                    placeholder="Describe the key gaps for this control…"
                                    className="text-sm border border-slate-200 rounded p-2 bg-white resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-xs font-medium text-slate-600">Remediation Action</label>
                                  <textarea
                                    value={row.remediationAction}
                                    onChange={(e) => updateRow(ctrl.id, { remediationAction: e.target.value })}
                                    placeholder="Describe the planned remediation actions…"
                                    className="text-sm border border-slate-200 rounded p-2 bg-white resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="flex flex-col gap-3">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">Owner</label>
                                    <input
                                      value={row.owner}
                                      onChange={(e) => updateRow(ctrl.id, { owner: e.target.value })}
                                      className="text-sm border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">Target Date</label>
                                    <input
                                      type="date"
                                      value={row.targetDate}
                                      onChange={(e) => updateRow(ctrl.id, { targetDate: e.target.value })}
                                      className="text-sm border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
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
