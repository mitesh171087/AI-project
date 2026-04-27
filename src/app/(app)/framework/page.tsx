"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ControlCard } from "@/components/ControlCard";
import { FilterPanel, type FilterState } from "@/components/FilterPanel";
import { SearchBar } from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { allControls, uniqueOwners, uniqueDomains } from "@/data";
import { filterControls } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import { FolderTree, SlidersHorizontal, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Criticality } from "@/types";

const CRITICALITY_OPTIONS: Criticality[] = ["Critical", "High", "Medium", "Low", "Not Applicable"];

export default function FrameworkPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    domain: "",
    priority: "",
    owner: "",
    status: "",
    evidenceReadiness: "",
  });
  const [criticalityFilter, setCriticalityFilter] = useState<Criticality | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const { overrides } = useOverrides();

  const urlPriority = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("priority") ?? ""
    : "";

  const activeFilters = { ...filters, priority: filters.priority || urlPriority };

  const filtered = useMemo(() => {
    let result = filterControls(allControls, { ...activeFilters, search });
    if (criticalityFilter) {
      result = result.filter((ctrl) => overrides[ctrl.id]?.criticality === criticalityFilter);
    }
    return result;
  }, [search, activeFilters, criticalityFilter, overrides]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof allControls> = {};
    for (const ctrl of filtered) {
      if (!map[ctrl.domain]) map[ctrl.domain] = [];
      map[ctrl.domain].push(ctrl);
    }
    return map;
  }, [filtered]);

  const hasFilters = search || criticalityFilter || Object.values(activeFilters).some(Boolean);

  const clearAll = () => {
    setSearch("");
    setCriticalityFilter("");
    setFilters({ domain: "", priority: "", owner: "", status: "", evidenceReadiness: "" });
  };

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Framework Explorer"
        subtitle={`${filtered.length} of ${allControls.length} controls`}
        actions={
          <div className="flex items-center gap-2">
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-slate-500">
                <X className="h-4 w-4" /> Clear filters
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 gap-0">
        {/* Filter sidebar */}
        {showFilters && (
          <div className="w-64 shrink-0 border-r border-slate-200 bg-white p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 text-sm">Filters</span>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              domains={uniqueDomains}
              owners={uniqueOwners}
            />

            {/* Criticality filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-orange-500" />Criticality (your settings)
              </label>
              <select
                className="text-sm border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                value={criticalityFilter}
                onChange={(e) => setCriticalityFilter(e.target.value as Criticality | "")}
              >
                <option value="">All criticalities</option>
                {CRITICALITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {criticalityFilter && (
                <p className="text-[10px] text-slate-400">Showing only controls you marked as &ldquo;{criticalityFilter}&rdquo;</p>
              )}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-6 flex flex-col gap-6 min-w-0">
          <SearchBar value={search} onChange={setSearch} />

          {filtered.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <FolderTree className="h-10 w-10 text-slate-300" />
                <p className="text-slate-500 font-medium">No controls match your search</p>
                <Button variant="outline" onClick={clearAll}>
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            Object.entries(grouped).map(([domain, controls]) => (
              <div key={domain}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-bold text-slate-800">{domain}</h2>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {controls.length} control{controls.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {controls.map((ctrl) => (
                    <ControlCard key={ctrl.id} control={ctrl} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
