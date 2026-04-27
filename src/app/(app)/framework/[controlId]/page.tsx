"use client";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaturityBadge } from "@/components/MaturityBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge, EvidenceBadge } from "@/components/StatusBadge";
import { CapabilityCard } from "@/components/CapabilityCard";
import { ActionTable } from "@/components/ActionTable";
import { RaciMatrix } from "@/components/RaciMatrix";
import { AuditQuestionAccordion } from "@/components/AuditQuestionAccordion";
import { EvidenceTable } from "@/components/EvidenceTable";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { Button } from "@/components/ui/button";
import { getControlById, allControls } from "@/data";
import { MATURITY_LABELS } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import {
  ChevronLeft, ChevronRight, AlertTriangle, Info, Target, ShieldAlert,
  Star, ExternalLink, Pencil, Save, RotateCcw, Check, Flame,
} from "lucide-react";
import type { MaturityLevel, Criticality, EvidenceItem, AuditQuestion, EvidenceStatus } from "@/types";

interface Props {
  params: Promise<{ controlId: string }>;
}

const CRITICALITY_OPTIONS: Criticality[] = ["Critical", "High", "Medium", "Low", "Not Applicable"];
const CRITICALITY_STYLES: Record<Criticality, string> = {
  "Critical": "bg-red-100 text-red-700 border border-red-200",
  "High": "bg-orange-100 text-orange-700 border border-orange-200",
  "Medium": "bg-yellow-100 text-yellow-700 border border-yellow-200",
  "Low": "bg-green-100 text-green-700 border border-green-200",
  "Not Applicable": "bg-slate-100 text-slate-500 border border-slate-200",
};

export default function ControlDetailPage({ params }: Props) {
  const { controlId } = use(params);
  const control = getControlById(controlId);
  if (!control) notFound();

  const { getOverride, updateControl, resetControl, isModified } = useOverrides();
  const override = getOverride(control.id);
  const modified = isModified(control.id);

  const idx = allControls.findIndex((c) => c.id === controlId);
  const prevCtrl = idx > 0 ? allControls[idx - 1] : null;
  const nextCtrl = idx < allControls.length - 1 ? allControls[idx + 1] : null;

  const l4 = control.maturityGuidance.find((g) => g.level === 4);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editable field state (populated when entering edit mode)
  const [editPlainEnglish, setEditPlainEnglish] = useState("");
  const [editSamaIntent, setEditSamaIntent] = useState("");
  const [editWhyItMatters, setEditWhyItMatters] = useState("");
  const [editRisk, setEditRisk] = useState("");
  const [editEvidence, setEditEvidence] = useState<EvidenceItem[]>([]);
  const [editAuditQs, setEditAuditQs] = useState<AuditQuestion[]>([]);

  // Criticality: saved immediately without edit mode
  const [criticality, setCriticality] = useState<Criticality | undefined>(override?.criticality);
  useEffect(() => { setCriticality(override?.criticality); }, [override?.criticality]);

  const enterEditMode = () => {
    setEditPlainEnglish(override?.plainEnglishInterpretation ?? control.plainEnglishInterpretation);
    setEditSamaIntent(override?.samaIntent ?? control.samaIntent);
    setEditWhyItMatters(override?.whyItMatters ?? control.whyItMatters);
    setEditRisk(override?.riskIfNotImplemented ?? control.riskIfNotImplemented);
    setEditEvidence((override?.evidenceChecklist ?? control.evidenceChecklist).map((e) => ({ ...e })));
    setEditAuditQs((override?.auditQuestions ?? control.auditQuestions).map((q) => ({ ...q })));
    setEditMode(true);
  };

  const handleSave = () => {
    updateControl(control.id, {
      plainEnglishInterpretation: editPlainEnglish,
      samaIntent: editSamaIntent,
      whyItMatters: editWhyItMatters,
      riskIfNotImplemented: editRisk,
      evidenceChecklist: editEvidence,
      auditQuestions: editAuditQs,
    });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDiscard = () => setEditMode(false);

  const handleReset = () => {
    if (!confirm("Reset all edits for this control to the original content? This cannot be undone.")) return;
    resetControl(control.id);
    setCriticality(undefined);
    setEditMode(false);
  };

  const handleCriticalityChange = (val: Criticality) => {
    setCriticality(val);
    updateControl(control.id, { criticality: val });
  };

  const updateEditEvidence = (idx: number, field: keyof EvidenceItem, value: string) => {
    setEditEvidence((prev) => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };

  const updateEditAuditQ = (idx: number, field: keyof AuditQuestion, value: string) => {
    setEditAuditQs((prev) => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  // Display values (override > seed data)
  const displayPlainEnglish = editMode ? editPlainEnglish : (override?.plainEnglishInterpretation ?? control.plainEnglishInterpretation);
  const displaySamaIntent = editMode ? editSamaIntent : (override?.samaIntent ?? control.samaIntent);
  const displayWhyItMatters = editMode ? editWhyItMatters : (override?.whyItMatters ?? control.whyItMatters);
  const displayRisk = editMode ? editRisk : (override?.riskIfNotImplemented ?? control.riskIfNotImplemented);
  const displayEvidence = editMode ? editEvidence : (override?.evidenceChecklist ?? control.evidenceChecklist);
  const displayAuditQs = editMode ? editAuditQs : (override?.auditQuestions ?? control.auditQuestions);

  return (
    <div className="flex flex-col min-h-full">
      <AppHeader
        title={`${control.controlNumber} – ${control.title}`}
        subtitle={`${control.domain} › ${control.subdomain}`}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {/* Edit controls */}
            {editMode ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
                <Button size="sm" variant="ghost" onClick={handleDiscard}>Discard</Button>
              </>
            ) : (
              <>
                {saved && (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <Check className="h-4 w-4" /> Saved
                  </span>
                )}
                {modified && (
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded px-2 py-0.5 font-medium">
                    Modified
                  </span>
                )}
                <Button size="sm" variant="outline" onClick={enterEditMode}>
                  <Pencil className="h-4 w-4" /> Edit Content
                </Button>
                {modified && (
                  <Button size="sm" variant="ghost" onClick={handleReset} className="text-red-600 hover:text-red-700">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                )}
              </>
            )}
            {/* Navigation */}
            {prevCtrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/framework/${prevCtrl.id}`}><ChevronLeft className="h-4 w-4" /></Link>
              </Button>
            )}
            {nextCtrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/framework/${nextCtrl.id}`}><ChevronRight className="h-4 w-4" /></Link>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/framework">← Framework</Link>
            </Button>
          </div>
        }
      />

      <div className="p-6 flex flex-col gap-6 flex-1">
        {/* Edit mode banner */}
        {editMode && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <Pencil className="h-4 w-4 shrink-0" />
            <span>Edit mode active — changes will be saved to your browser. Use <strong>Save Changes</strong> to persist edits or <strong>Discard</strong> to cancel.</span>
          </div>
        )}

        {/* Control header strip */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
                {control.controlNumber}
              </span>
              <PriorityBadge priority={control.priority} showLabel />
              <StatusBadge status={control.implementationStatus} />
              <EvidenceBadge status={control.evidenceReadiness} />

              {/* Criticality selector */}
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">Criticality:</span>
                {criticality && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CRITICALITY_STYLES[criticality]}`}>
                    {criticality}
                  </span>
                )}
                <select
                  value={criticality ?? ""}
                  onChange={(e) => e.target.value ? handleCriticalityChange(e.target.value as Criticality) : undefined}
                  className="text-xs border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Set criticality…</option>
                  {CRITICALITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-slate-500">Current:</span>
                <MaturityBadge level={control.currentMaturity} />
                <span className="text-xs text-slate-500">→ Target:</span>
                <MaturityBadge level={control.targetMaturity} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="raci">RACI Matrix</TabsTrigger>
            <TabsTrigger value="audit">Audit Questions</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="maturity">Maturity Guidance</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 flex flex-col gap-4">
                <EditableCard
                  editMode={editMode}
                  icon={<Info className="h-4 w-4 text-blue-500" />}
                  title="Plain-English Interpretation"
                  text={displayPlainEnglish}
                  value={editPlainEnglish}
                  onChange={setEditPlainEnglish}
                />
                <EditableCard
                  editMode={editMode}
                  icon={<Target className="h-4 w-4 text-violet-500" />}
                  title="SAMA's Regulatory Intent"
                  text={displaySamaIntent}
                  value={editSamaIntent}
                  onChange={setEditSamaIntent}
                />
                <EditableCard
                  editMode={editMode}
                  icon={<Star className="h-4 w-4 text-amber-500" />}
                  title="Why This Control Matters"
                  text={displayWhyItMatters}
                  value={editWhyItMatters}
                  onChange={setEditWhyItMatters}
                />
                <Card className={editMode ? "border-red-200 ring-1 ring-red-200" : "border-red-100"}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <ShieldAlert className="h-4 w-4" />Risk if Not Implemented
                      {editMode && <span className="text-[10px] bg-red-100 text-red-600 rounded px-1.5 ml-1">Editing</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <textarea
                        className="w-full text-sm text-red-700 leading-relaxed border border-red-200 rounded p-2 bg-red-50/30 focus:outline-none focus:ring-1 focus:ring-red-400 resize-y min-h-[80px]"
                        value={editRisk}
                        onChange={(e) => setEditRisk(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-red-700 leading-relaxed">{displayRisk}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader><CardTitle>Control Metadata</CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-3 text-sm">
                    <Row label="Domain" value={control.domain} />
                    <Row label="Subdomain" value={control.subdomain} />
                    <Row label="Primary Owner" value={control.primaryOwner} />
                    <Row label="Priority" value={<PriorityBadge priority={control.priority} showLabel />} />
                    <Row label="Current Maturity" value={<MaturityBadge level={control.currentMaturity} />} />
                    <Row label="Target Maturity" value={<MaturityBadge level={control.targetMaturity} />} />
                    <Row label="Status" value={<StatusBadge status={control.implementationStatus} />} />
                    <Row label="Evidence" value={<EvidenceBadge status={control.evidenceReadiness} />} />
                    {criticality && (
                      <Row label="Criticality" value={
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CRITICALITY_STYLES[criticality]}`}>{criticality}</span>
                      } />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Supporting Stakeholders</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {control.supportingStakeholders.map((s) => (
                        <span key={s} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700">{s}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {control.relatedControls.length > 0 && (
                  <Card>
                    <CardHeader><CardTitle>Related Controls</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {control.relatedControls.map((num) => {
                          const rel = allControls.find((c) => c.controlNumber === num);
                          return rel ? (
                            <Link key={num} href={`/framework/${rel.id}`}>
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 text-xs font-medium hover:bg-blue-100 transition-colors">
                                {num} <ExternalLink className="h-3 w-3" />
                              </span>
                            </Link>
                          ) : (
                            <span key={num} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{num}</span>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-amber-100 bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <AlertTriangle className="h-4 w-4" />Common Gaps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                      {control.commonGaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />{gap}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Capabilities */}
          <TabsContent value="capabilities">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                The bank must develop these IT capabilities to fully activate control {control.controlNumber}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {control.requiredCapabilities.map((cap) => (
                  <CapabilityCard key={cap.id} capability={cap} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Actions */}
          <TabsContent value="actions">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Structured implementation actions across People, Process, and Technology dimensions.
              </p>
              <ActionTable actions={control.actions} controlTitle={control.title} />
            </div>
          </TabsContent>

          {/* Tab 4: RACI */}
          <TabsContent value="raci">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Accountability matrix for all activities within control {control.controlNumber}.
              </p>
              <RaciMatrix items={control.raciMatrix} />
            </div>
          </TabsContent>

          {/* Tab 5: Audit Questions */}
          <TabsContent value="audit">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Questions SAMA examiners may ask during a maturity assessment or audit visit for this control.
                {editMode && <span className="ml-2 text-blue-600 font-medium">Edit mode active — click fields to edit.</span>}
              </p>
              {editMode ? (
                <div className="flex flex-col gap-4">
                  {editAuditQs.map((q, i) => (
                    <Card key={q.id} className="border-blue-200 ring-1 ring-blue-100">
                      <CardContent className="p-4 flex flex-col gap-3">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Question</label>
                          <textarea
                            className="w-full mt-1 text-sm border border-slate-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y min-h-[60px]"
                            value={q.question}
                            onChange={(e) => updateEditAuditQ(i, "question", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Why SAMA May Ask</label>
                          <textarea
                            className="w-full mt-1 text-sm border border-slate-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y min-h-[50px]"
                            value={q.whySamaMayAsk}
                            onChange={(e) => updateEditAuditQ(i, "whySamaMayAsk", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Expected Answer</label>
                          <textarea
                            className="w-full mt-1 text-sm border border-slate-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y min-h-[80px]"
                            value={q.expectedAnswer}
                            onChange={(e) => updateEditAuditQ(i, "expectedAnswer", e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <AuditQuestionAccordion questions={displayAuditQs} />
              )}
            </div>
          </TabsContent>

          {/* Tab 6: Evidence */}
          <TabsContent value="evidence">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Evidence items required to demonstrate compliance maturity for control {control.controlNumber}.
                {editMode && <span className="ml-2 text-blue-600 font-medium">Edit mode active — edit name, description, or status.</span>}
              </p>
              {editMode ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="text-left px-4 py-2 text-xs text-slate-500 font-semibold uppercase">Name</th>
                            <th className="text-left px-4 py-2 text-xs text-slate-500 font-semibold uppercase">Description</th>
                            <th className="text-left px-4 py-2 text-xs text-slate-500 font-semibold uppercase w-36">Status</th>
                            <th className="text-left px-4 py-2 text-xs text-slate-500 font-semibold uppercase w-24">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {editEvidence.map((ev, i) => (
                            <tr key={ev.id} className="border-b border-slate-50">
                              <td className="px-4 py-2">
                                <input
                                  className="w-full text-sm border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  value={ev.name}
                                  onChange={(e) => updateEditEvidence(i, "name", e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <textarea
                                  className="w-full text-sm border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y min-h-[50px]"
                                  value={ev.description}
                                  onChange={(e) => updateEditEvidence(i, "description", e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <select
                                  className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                                  value={ev.status}
                                  onChange={(e) => updateEditEvidence(i, "status", e.target.value as EvidenceStatus)}
                                >
                                  {(["Missing", "Partial", "Available", "Verified"] as EvidenceStatus[]).map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-2">
                                <span className="text-xs text-slate-500">{ev.type}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <EvidenceTable
                  items={displayEvidence}
                  exportFilename={`${control.controlNumber}-evidence.csv`}
                />
              )}
            </div>
          </TabsContent>

          {/* Tab 7: Maturity Guidance */}
          <TabsContent value="maturity">
            <div className="flex flex-col gap-4">
              {l4 && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Star className="h-5 w-5 text-green-600" />Level 4 – SAMA Readiness Target
                    </CardTitle>
                    <p className="text-sm text-green-700 mt-1">{l4.description}</p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Documentation Expected</p>
                      <ul className="flex flex-col gap-1">
                        {l4.documentationExpected.map((d, i) => <li key={i} className="text-sm text-green-800 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />{d}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Operating Evidence Expected</p>
                      <ul className="flex flex-col gap-1">
                        {l4.operatingEvidenceExpected.map((d, i) => <li key={i} className="text-sm text-green-800 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />{d}</li>)}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {control.maturityGuidance.map((g) => (
                  <MaturityLevelCard key={g.level} guidance={g} current={control.currentMaturity} target={control.targetMaturity} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab 8: Roadmap */}
          <TabsContent value="roadmap">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Phased implementation roadmap for achieving Level {control.targetMaturity} maturity on control {control.controlNumber}.
              </p>
              <RoadmapTimeline items={control.roadmap} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────

function EditableCard({
  editMode, icon, title, text, value, onChange,
}: {
  editMode: boolean;
  icon: React.ReactNode;
  title: string;
  text: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card className={editMode ? "border-blue-200 ring-1 ring-blue-100" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}{title}
          {editMode && <span className="text-[10px] bg-blue-100 text-blue-600 rounded px-1.5 ml-1">Editing</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <textarea
            className="w-full text-sm text-slate-700 leading-relaxed border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y min-h-[80px]"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
        )}
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className="text-right">{typeof value === "string" ? <span className="text-xs font-medium text-slate-800">{value}</span> : value}</span>
    </div>
  );
}

interface MaturityGuidanceItem {
  level: MaturityLevel;
  label: string;
  description: string;
  documentationExpected: string[];
  operatingEvidenceExpected: string[];
  gapsToClose: string[];
}

function MaturityLevelCard({
  guidance, current, target,
}: {
  guidance: MaturityGuidanceItem;
  current: MaturityLevel;
  target: MaturityLevel;
}) {
  const isCurrentLevel = guidance.level === current;
  const isTarget = guidance.level === target;
  const LEVEL_STYLES: Record<MaturityLevel, { border: string; bg: string; label: string }> = {
    1: { border: "border-red-200", bg: "bg-red-50/50", label: "bg-red-100 text-red-700" },
    2: { border: "border-orange-200", bg: "bg-orange-50/50", label: "bg-orange-100 text-orange-700" },
    3: { border: "border-yellow-200", bg: "bg-yellow-50/50", label: "bg-yellow-100 text-yellow-700" },
    4: { border: "border-green-200", bg: "bg-green-50/50", label: "bg-green-100 text-green-700" },
    5: { border: "border-blue-200", bg: "bg-blue-50/50", label: "bg-blue-100 text-blue-700" },
  };
  const style = LEVEL_STYLES[guidance.level as MaturityLevel];

  return (
    <Card className={`${style.border} ${style.bg}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${style.label}`}>
            Level {guidance.level} – {guidance.label}
          </span>
          <div className="flex gap-1">
            {isCurrentLevel && <span className="text-[10px] bg-slate-200 text-slate-700 rounded px-1.5 py-0.5 font-medium">Current</span>}
            {isTarget && <span className="text-[10px] bg-blue-200 text-blue-700 rounded px-1.5 py-0.5 font-medium">Target</span>}
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-1">{guidance.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {guidance.documentationExpected.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Documentation expected</p>
            <ul className="flex flex-col gap-0.5">
              {guidance.documentationExpected.map((d, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />{d}
                </li>
              ))}
            </ul>
          </div>
        )}
        {guidance.gapsToClose.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Gaps to close for next level</p>
            <ul className="flex flex-col gap-0.5">
              {guidance.gapsToClose.map((g, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-amber-400 shrink-0" />{g}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
