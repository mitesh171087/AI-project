"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useControlOverrides } from "@/hooks/useControlOverrides";
import type { AllOverrides, ControlOverride } from "@/types";

interface ContextValue {
  overrides: AllOverrides;
  ready: boolean;
  storageError: string | null;
  dismissError: () => void;
  updateControl: (id: string, updates: Partial<ControlOverride>) => void;
  resetControl: (id: string) => void;
  getOverride: (id: string) => ControlOverride | undefined;
  isModified: (id: string) => boolean;
  persist: (next: AllOverrides) => void;
}

const ControlOverridesContext = createContext<ContextValue | null>(null);

export function ControlOverridesProvider({ children }: { children: ReactNode }) {
  const value = useControlOverrides();
  return (
    <ControlOverridesContext.Provider value={value}>
      {children}
    </ControlOverridesContext.Provider>
  );
}

export function useOverrides() {
  const ctx = useContext(ControlOverridesContext);
  if (!ctx) throw new Error("useOverrides must be used within ControlOverridesProvider");
  return ctx;
}
