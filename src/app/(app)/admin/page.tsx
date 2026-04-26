"use client";
import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriorityBadge } from "@/components/PriorityBadge";
import { MaturityBadge } from "@/components/MaturityBadge";
import { StatusBadge, EvidenceBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { allControls, domains } from "@/data";
import { ExternalLink, Database, Settings, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [selectedCtrl, setSelectedCtrl] = useState(allControls[0]);

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Admin / Content Management"
        subtitle="View and manage SAMA ITGF control seed data"
      />
      <div className="p-6 flex flex-col gap-6">
        {/* Notice */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Development Mode – No Authentication</p>
              <p className="text-xs text-amber-700 mt-0.5">
                This admin panel currently reads from TypeScript seed data files in <code className="bg-amber-100 px-1 rounded">src/data/controls/</code>.
                Future enhancement: connect to a database or CMS with role-based access control.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Future integration placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Database, title: "Database Integration", desc: "Replace seed data with PostgreSQL / MongoDB. Schema ready in src/types/index.ts.", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Settings, title: "CMS Integration", desc: "Connect to Contentful, Sanity, or Strapi for non-technical content editors to manage control content.", color: "text-violet-600", bg: "bg-violet-50" },
            { icon: ExternalLink, title: "GRC Integration", desc: "Export compliance data to RSA Archer, ServiceNow GRC, or MetricStream via API.", color: "text-teal-600", bg: "bg-teal-50" },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <Card key={title} className="border-dashed">
              <CardContent className="p-4 flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <span className="text-xs text-slate-400 italic">Placeholder – future enhancement</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls list + detail view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Control list */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Controls ({allControls.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {allControls.map((ctrl) => (
                  <button
                    key={ctrl.id}
                    onClick={() => setSelectedCtrl(ctrl)}
                    className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors ${
                      selectedCtrl.id === ctrl.id ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700">{ctrl.controlNumber}</span>
                      <PriorityBadge priority={ctrl.priority} />
                    </div>
                    <p className="text-sm text-slate-800 mt-0.5 line-clamp-1">{ctrl.title}</p>
                    <p className="text-xs text-slate-400">{ctrl.domain}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Control detail JSON viewer */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedCtrl.controlNumber} – {selectedCtrl.title}</CardTitle>
                <Link href={`/framework/${selectedCtrl.id}`}>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" /> View
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <PriorityBadge priority={selectedCtrl.priority} showLabel />
                  <MaturityBadge level={selectedCtrl.currentMaturity} />
                  <StatusBadge status={selectedCtrl.implementationStatus} />
                  <EvidenceBadge status={selectedCtrl.evidenceReadiness} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <AdminRow label="Control ID" value={selectedCtrl.id} />
                  <AdminRow label="Domain" value={selectedCtrl.domain} />
                  <AdminRow label="Subdomain" value={selectedCtrl.subdomain} />
                  <AdminRow label="Primary Owner" value={selectedCtrl.primaryOwner} />
                  <AdminRow label="Capabilities" value={`${selectedCtrl.requiredCapabilities.length} items`} />
                  <AdminRow label="Actions" value={`${selectedCtrl.actions.length} items`} />
                  <AdminRow label="RACI Rows" value={`${selectedCtrl.raciMatrix.length} rows`} />
                  <AdminRow label="Audit Questions" value={`${selectedCtrl.auditQuestions.length} items`} />
                  <AdminRow label="Evidence Items" value={`${selectedCtrl.evidenceChecklist.length} items`} />
                  <AdminRow label="Roadmap Items" value={`${selectedCtrl.roadmap.length} items`} />
                  <AdminRow label="Related Controls" value={selectedCtrl.relatedControls.join(", ") || "None"} />
                  <AdminRow label="Common Gaps" value={`${selectedCtrl.commonGaps.length} identified`} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Plain-English Interpretation</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedCtrl.plainEnglishInterpretation}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Seed Data File</p>
                  <code className="text-xs bg-slate-100 px-3 py-2 rounded block text-slate-700">
                    src/data/controls/{selectedCtrl.controlNumber.replace(/\./g, "")}-*.ts
                  </code>
                  <p className="text-xs text-slate-400 mt-1">
                    To update this control's content, edit the corresponding seed data file and rebuild.
                    Future: edit via this UI with database persistence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AdminRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 p-2 bg-slate-50 rounded">
      <span className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-xs font-medium text-slate-800 break-all">{value}</span>
    </div>
  );
}
