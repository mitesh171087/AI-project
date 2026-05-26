"use client";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ControlOverridesProvider, useOverrides } from "@/context/ControlOverridesContext";
import { AlertTriangle, X } from "lucide-react";

function StorageErrorBanner() {
  const { storageError, dismissError } = useOverrides();
  if (!storageError) return null;
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border-b border-red-200 text-red-800 text-sm">
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
      <span className="flex-1">{storageError}</span>
      <button onClick={dismissError} className="shrink-0 hover:text-red-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen bg-slate-50">
        <StorageErrorBanner />
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ControlOverridesProvider>
      <AppShell>{children}</AppShell>
    </ControlOverridesProvider>
  );
}
