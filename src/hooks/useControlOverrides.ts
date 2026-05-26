"use client";
import { useState, useEffect, useCallback } from "react";
import type { AllOverrides, ControlOverride } from "@/types";

const STORAGE_KEY = "sama-control-overrides";

export function useControlOverrides() {
  const [overrides, setOverrides] = useState<AllOverrides>({});
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setOverrides(JSON.parse(stored));
    } catch (e) {
      console.error("[SAMA] Failed to load saved assessment data:", e);
      setStorageError(
        "Your saved assessment data could not be loaded — it may be corrupted. " +
        "Export a backup from the Admin page before making new changes."
      );
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: AllOverrides) => {
    setOverrides(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        setStorageError(
          "Browser storage limit reached — your latest change was NOT saved. " +
          "Export a backup from the Admin page to free up space."
        );
      } else {
        console.error("[SAMA] Failed to persist data:", e);
      }
    }
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
        } catch (e) {
          if (e instanceof DOMException && e.name === "QuotaExceededError") {
            setStorageError(
              "Browser storage limit reached — your latest change was NOT saved. " +
              "Export a backup from the Admin page to free up space."
            );
          } else {
            console.error("[SAMA] Failed to persist data:", e);
          }
        }
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
        } catch (e) {
          console.error("[SAMA] Failed to persist data:", e);
        }
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

  const dismissError = useCallback(() => setStorageError(null), []);

  return { overrides, ready, storageError, dismissError, updateControl, resetControl, getOverride, isModified, persist };
}
