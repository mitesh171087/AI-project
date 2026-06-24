import { Routes, Route, Navigate } from 'react-router-dom'
import { ControlOverridesProvider, useOverrides } from '@/context/ControlOverridesContext'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { AlertTriangle, X } from 'lucide-react'
import DashboardPage from '@/app/(app)/dashboard/page'
import FrameworkPage from '@/app/(app)/framework/page'
import ControlDetailPage from '@/app/(app)/framework/[controlId]/page'
import AssessmentPage from '@/app/(app)/assessment/page'
import EvidencePage from '@/app/(app)/evidence/page'
import RaciPage from '@/app/(app)/raci/page'
import RoadmapPage from '@/app/(app)/roadmap/page'
import SearchPage from '@/app/(app)/search/page'
import AdminPage from '@/app/(app)/admin/page'

function StorageErrorBanner() {
  const { storageError, dismissError } = useOverrides()
  if (!storageError) return null
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border-b border-red-200 text-red-800 text-sm">
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
      <span className="flex-1">{storageError}</span>
      <button onClick={dismissError} className="shrink-0 hover:text-red-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
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
  )
}

export default function App() {
  return (
    <ControlOverridesProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/framework" element={<FrameworkPage />} />
          <Route path="/framework/:controlId" element={<ControlDetailPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/raci" element={<RaciPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AppShell>
    </ControlOverridesProvider>
  )
}
