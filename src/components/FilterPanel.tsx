"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterState {
  domain: string;
  owner: string;
  status: string;
  evidenceReadiness: string;
}

const EMPTY = "all";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  domains: string[];
  owners: string[];
}

function Sel({ label, value, options, onValueChange }: { label: string; value: string; options: string[]; onValueChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder={`All ${label}s`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EMPTY}>All {label}s</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterPanel({ filters, onChange, domains, owners }: FilterPanelProps) {
  const set = (key: keyof FilterState, val: string) =>
    onChange({ ...filters, [key]: val === EMPTY ? "" : val });

  const hasActive = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Filters</span>
        {hasActive && (
          <Button variant="ghost" size="sm" onClick={() => onChange({ domain: "", owner: "", status: "", evidenceReadiness: "" })}>
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>
      <Sel label="Domain" value={filters.domain || EMPTY} options={domains} onValueChange={(v) => set("domain", v)} />
      <Sel label="Owner" value={filters.owner || EMPTY} options={owners} onValueChange={(v) => set("owner", v)} />
      <Sel label="Status" value={filters.status || EMPTY} options={["Not Started", "In Progress", "Implemented", "Needs Review"]} onValueChange={(v) => set("status", v)} />
      <Sel label="Evidence" value={filters.evidenceReadiness || EMPTY} options={["Missing", "Partial", "Available", "Verified"]} onValueChange={(v) => set("evidenceReadiness", v)} />
    </div>
  );
}
