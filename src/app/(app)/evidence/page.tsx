"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { EvidenceTable } from "@/components/EvidenceTable";
import { SearchBar } from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allEvidenceItems, uniqueDomains } from "@/data";
import { EVIDENCE_COLORS } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export default function EvidencePage() {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    let items = allEvidenceItems;
    if (domainFilter) items = items.filter((e) => e.domain === domainFilter);
    if (typeFilter) items = items.filter((e) => e.type === typeFilter);
    if (statusFilter) items = items.filter((e) => e.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q));
    }
    return items;
  }, [search, domainFilter, typeFilter, statusFilter]);

  const counts = useMemo(() => ({
    Missing: allEvidenceItems.filter((e) => e.status === "Missing").length,
    Partial: allEvidenceItems.filter((e) => e.status === "Partial").length,
    Available: allEvidenceItems.filter((e) => e.status === "Available").length,
    Verified: allEvidenceItems.filter((e) => e.status === "Verified").length,
  }), []);

  const types = [...new Set(allEvidenceItems.map((e) => e.type))];

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Evidence Library"
        subtitle={`${filtered.length} of ${allEvidenceItems.length} evidence items`}
      />
      <div className="p-6 flex flex-col gap-6">
        {/* Status summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(counts).map(([status, count]) => (
            <Card key={status} className={`cursor-pointer transition-all ${statusFilter === status ? "ring-2 ring-blue-500" : ""}`} onClick={() => setStatusFilter(statusFilter === status ? "" : status)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{status}</p>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                </div>
                <div className={`w-2.5 h-12 rounded-full ${count > 0 ? "opacity-100" : "opacity-20"}`} style={{ background: { Missing: "#ef4444", Partial: "#f59e0b", Available: "#3b82f6", Verified: "#22c55e" }[status] }} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <SearchBar value={search} onChange={setSearch} className="flex-1 min-w-56" />
          <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Domains</option>
            {uniqueDomains.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            {["Missing", "Partial", "Available", "Verified"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <BookOpen className="h-10 w-10 text-slate-300" />
              <p className="text-slate-500">No evidence items match your criteria</p>
            </CardContent>
          </Card>
        ) : (
          <EvidenceTable items={filtered} showControlColumn exportFilename="sama-itgf-evidence.csv" />
        )}
      </div>
    </div>
  );
}
