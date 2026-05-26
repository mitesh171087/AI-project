"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({ value, onChange, placeholder = "Search controls, capabilities, evidence…", className, debounceMs = 200 }: SearchBarProps) {
  const [local, setLocal] = useState(value);

  // Keep local in sync when parent resets value externally (e.g. Clear filters)
  useEffect(() => { setLocal(value); }, [value]);

  useEffect(() => {
    if (debounceMs === 0) { onChange(local); return; }
    const t = setTimeout(() => onChange(local), debounceMs);
    return () => clearTimeout(t);
  }, [local, debounceMs]);

  return (
    <div className={`relative flex items-center ${className ?? ""}`}>
      <Search className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
      <Input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {local && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 h-7 w-7"
          onClick={() => { setLocal(""); onChange(""); }}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
