"use client";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ControlCard } from "@/components/ControlCard";
import { FilterPanel, type FilterState } from "@/components/FilterPanel";
import { SearchBar } from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { allControls, domains, uniqueOwners, uniqueDomains } from "@/data";
import { filterControls } from "@/lib/utils";
import { FolderTree, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FrameworkPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    domain: "",
    priority: "",
    owner: "",
    status: "",
    evidenceReadiness: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Support ?priority=P1 link from dashboard
  const urlPriority = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("priority") ?? ""
    : "";

  const activeFilters = { ...filters, priority: filters.priority || urlPriority };

  const filtered = useMemo(
    () => filterControls(allControls, { ...activeFilters, search }),
    [search, activeFilters]
  );

  const grouped = useMemo(() => {
    const map: Record<string, typeof allControls> = {};
    for (const ctrl of filtered) {
      if (!map[ctrl.domain]) map[ctrl.domain] = [];
      map[ctrl.domain].push(ctrl);
    }
    return map;
  }, [filtered]);

  const hasFilters = search || Object.values(activeFilters).some(Boolean);

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Framework Explorer"
        subtitle={`${filtered.length} of ${allControls.length} controls`}
        actions={
          <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        }
      />

      <div className="flex flex-1 gap-0">
        {/* Filter sidebar */}
        {showFilters && (
          <div className="w-64 shrink-0 border-r border-slate-200 bg-white p-4 flex flex-col gap-4 animate-fadeIn">
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
                <Button variant="outline" onClick={() => { setSearch(""); setFilters({ domain: "", priority: "", owner: "", status: "", evidenceReadiness: "" }); }}>
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
                    {controls.length} controls
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
