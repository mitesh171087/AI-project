"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allControls, domains } from "@/data";
import { useOverrides } from "@/context/ControlOverridesContext";
import { ExternalLink, Database, Settings, AlertCircle, Download, Upload, Trash2, HardDrive, BarChart3, FileCheck } from "lucide-react";

export default function AdminPage() {
  const [selectedCtrl, setSelectedCtrl] = useState(allControls[0]);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { overrides, persist } = useOverrides();

  const assessedCount = allControls.filter((c) => !!(overrides[c.id]?.auditTrail?.length)).length;
  const criticalitySetCount = allControls.filter((c) => !!overrides[c.id]?.criticality).length;
  const auditTrailTotal = allControls.reduce((sum, c) => sum + (overrides[c.id]?.auditTrail?.length ?? 0), 0);
  const dataSizeKb = Math.round(JSON.stringify(overrides).length / 1024 * 10) / 10;

  const handleExport = () => {
    const json = JSON.stringify(overrides, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `sama-assessment-backup-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    setImportError(null);
    setImportSuccess(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        const knownIds = new Set(allControls.map((c) => c.id));
        const hasValidKey = Object.keys(parsed).some((k) => knownIds.has(k));
        if (!hasValidKey) {
          setImportError("This file does not appear to be a valid SAMA ITGF assessment backup. No matching control IDs found.");
          return;
        }
        if (!confirm(`This will replace all your current assessment data with the imported backup (${Object.keys(parsed).length} control overrides). Continue?`)) return;
        persist(parsed);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch {
        setImportError("Could not parse the file. Make sure it is a valid JSON backup exported from this application.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClearAll = () => {
    if (!confirm("This will permanently delete ALL your saved assessment data (maturity ratings, audit trail, criticality settings). This cannot be undone. Are you sure?")) return;
    persist({});
  };

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

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-slate-600" /> Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Storage stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={FileCheck} label="Controls Assessed" value={`${assessedCount} / ${allControls.length}`} color="text-green-700" bg="bg-green-50" />
              <StatCard icon={BarChart3} label="Criticality Set" value={`${criticalitySetCount} / ${allControls.length}`} color="text-orange-600" bg="bg-orange-50" />
              <StatCard icon={Database} label="Audit Trail Entries" value={auditTrailTotal} color="text-violet-600" bg="bg-violet-50" />
              <StatCard icon={HardDrive} label="Data Size" value={`${dataSizeKb} KB`} color="text-slate-600" bg="bg-slate-50" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1.5">
                <Download className="h-4 w-4" /> Export Backup (JSON)
              </Button>
              <Button variant="outline" size="sm" onClick={handleImportClick} className="flex items-center gap-1.5">
                <Upload className="h-4 w-4" /> Import Backup (JSON)
              </Button>
              <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFileChange} />
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto">
                <Trash2 className="h-4 w-4" /> Clear All Data
              </Button>
            </div>

            {importError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">{importError}</p>
            )}
            {importSuccess && (
              <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded p-2">✓ Assessment data imported successfully.</p>
            )}

            <p className="text-xs text-slate-400">
              Export creates a JSON backup of all your assessment data (maturity ratings, criticality, owners, audit trail). Import restores from a previous backup.
              Store backups in a secure location to protect against browser data loss.
            </p>
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
                      selectedCtrl.id === ctrl.id ? "bg-green-50 border-l-2 border-l-green-600" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold" style={{ color: "#006B3F" }}>{ctrl.controlNumber}</span>
                      {overrides[ctrl.id]?.auditTrail?.length ? (
                        <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">Assessed</span>
                      ) : null}
                    </div>
                    <p className="text-sm text-slate-800 mt-0.5 line-clamp-1">{ctrl.title}</p>
                    <p className="text-xs text-slate-400">{ctrl.domain}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

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
                    To update this control&apos;s content, edit the corresponding seed data file and rebuild.
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

function StatCard({ icon: Icon, label, value, color, bg }: { icon: React.ElementType; label: string; value: string | number; color: string; bg: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <p className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
