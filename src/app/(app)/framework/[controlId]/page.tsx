"use client";
import { use } from "react";
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
import {
  ChevronLeft, ChevronRight, AlertTriangle, Info, Target, ShieldAlert,
  Star, ExternalLink,
} from "lucide-react";
import type { MaturityLevel } from "@/types";

interface Props {
  params: Promise<{ controlId: string }>;
}

export default function ControlDetailPage({ params }: Props) {
  const { controlId } = use(params);
  const control = getControlById(controlId);

  if (!control) notFound();

  const idx = allControls.findIndex((c) => c.id === controlId);
  const prevCtrl = idx > 0 ? allControls[idx - 1] : null;
  const nextCtrl = idx < allControls.length - 1 ? allControls[idx + 1] : null;

  const l4 = control.maturityGuidance.find((g) => g.level === 4);

  return (
    <div className="flex flex-col min-h-full">
      <AppHeader
        title={`${control.controlNumber} – ${control.title}`}
        subtitle={`${control.domain} › ${control.subdomain}`}
        actions={
          <div className="flex items-center gap-2">
            {prevCtrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/framework/${prevCtrl.id}`}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {nextCtrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/framework/${nextCtrl.id}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/framework">← Framework</Link>
            </Button>
          </div>
        }
      />

      <div className="p-6 flex flex-col gap-6 flex-1">
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
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-4 w-4 text-blue-500" />Plain-English Interpretation</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-slate-700 leading-relaxed">{control.plainEnglishInterpretation}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-violet-500" />SAMA's Regulatory Intent</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-slate-700 leading-relaxed">{control.samaIntent}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" />Why This Control Matters</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-slate-700 leading-relaxed">{control.whyItMatters}</p></CardContent>
                </Card>
                <Card className="border-red-100">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-red-700"><ShieldAlert className="h-4 w-4" />Risk if Not Implemented</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-red-700 leading-relaxed">{control.riskIfNotImplemented}</p></CardContent>
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
                  <CardHeader><CardTitle className="flex items-center gap-2 text-amber-800"><AlertTriangle className="h-4 w-4" />Common Gaps</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                      {control.commonGaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          {gap}
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
              </p>
              <AuditQuestionAccordion questions={control.auditQuestions} />
            </div>
          </TabsContent>

          {/* Tab 6: Evidence */}
          <TabsContent value="evidence">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Evidence items required to demonstrate compliance maturity for control {control.controlNumber}.
              </p>
              <EvidenceTable
                items={control.evidenceChecklist}
                exportFilename={`${control.controlNumber}-evidence.csv`}
              />
            </div>
          </TabsContent>

          {/* Tab 7: Maturity Guidance */}
          <TabsContent value="maturity">
            <div className="flex flex-col gap-4">
              {/* L4 highlight */}
              {l4 && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Star className="h-5 w-5 text-green-600" />
                      Level 4 – SAMA Readiness Target
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

              {/* All levels */}
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
  guidance,
  current,
  target,
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
