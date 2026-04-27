"use client";
import { useState, useEffect, useCallback } from "react";
import type { AllOverrides, ControlOverride } from "@/types";

const STORAGE_KEY = "sama-control-overrides";

export function useControlOverrides() {
  const [overrides, setOverrides] = useState<AllOverrides>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setOverrides(JSON.parse(stored));
    } catch {}
    setReady(true);
  }, []);

  const persist = useCallback((next: AllOverrides) => {
    setOverrides(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const updateControl = useCallback(
    (controlId: string, updates: Partial<ControlOverride>) => {
      setOverrides((prev) => {
        const next = {
          ...prev,
          [controlId]: { ...prev[controlId], ...updates },
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const resetControl = useCallback(
    (controlId: string) => {
      setOverrides((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [controlId]: _removed, ...rest } = prev;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
        } catch {}
        return rest;
      });
    },
    []
  );

  const getOverride = useCallback(
    (controlId: string): ControlOverride | undefined => overrides[controlId],
    [overrides]
  );

  const isModified = useCallback(
    (controlId: string): boolean =>
      !!overrides[controlId] && Object.keys(overrides[controlId]).length > 0,
    [overrides]
  );

  return { overrides, ready, updateControl, resetControl, getOverride, isModified, persist };
}
