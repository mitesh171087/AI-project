import { AppSidebar } from "@/components/layout/AppSidebar";
import { ControlOverridesProvider } from "@/context/ControlOverridesContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ControlOverridesProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 ml-64 flex flex-col min-h-screen bg-slate-50">
          {children}
        </main>
      </div>
    </ControlOverridesProvider>
  );
}
