"use client";
import { useMemo } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/PriorityBadge";
import { MaturityBadge } from "@/components/MaturityBadge";
import { EvidenceBadge } from "@/components/StatusBadge";
import {
  ShieldCheck, AlertTriangle, BarChart3, BookOpen,
  ArrowRight, TrendingUp, CheckCircle2, XCircle, Clock,
} from "lucide-react";
import { allControls, domains } from "@/data";
import { computeDashboardStats, MATURITY_COLORS, DOMAIN_COLORS, cn } from "@/lib/utils";
import type { Control } from "@/types";

const HEATMAP_COLORS: Record<number, string> = {
  1: "bg-red-400",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-green-400",
  5: "bg-blue-400",
};

export default function DashboardPage() {
  const stats = useMemo(() => computeDashboardStats(allControls, []), []);

  const priorityData = [
    { name: "P1 – Critical", value: stats.byPriority.P1, fill: "#ef4444" },
    { name: "P2 – Important", value: stats.byPriority.P2, fill: "#f59e0b" },
    { name: "P3 – Standard", value: stats.byPriority.P3, fill: "#3b82f6" },
  ];

  const statusData = Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }));

  const evidenceData = Object.entries(stats.byEvidenceReadiness).map(([name, value]) => ({ name, value }));
  const evidenceColors: Record<string, string> = {
    Missing: "#ef4444",
    Partial: "#f59e0b",
    Available: "#3b82f6",
    Verified: "#22c55e",
  };

  const radarData = domains.map((d) => {
    const controls = allControls.filter((c) => c.domainId === d.id);
    const avg = controls.reduce((sum, c) => sum + c.currentMaturity, 0) / (controls.length || 1);
    return { subject: d.name.replace("IT ", ""), score: Math.round(avg * 10) / 10, fullMark: 5 };
  });

  const gapControls = allControls
    .filter((c) => c.targetMaturity > c.currentMaturity)
    .sort((a, b) => (b.targetMaturity - b.currentMaturity) - (a.targetMaturity - a.currentMaturity))
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Compliance Dashboard"
        subtitle="SAMA ITGF compliance posture overview"
        actions={
          <Button asChild size="sm">
            <Link href="/framework">
              Explore Framework <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Total Controls"
            value={stats.totalControls}
            subtitle={`Across ${stats.totalDomains} domains`}
            icon={ShieldCheck}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
          />
          <DashboardMetricCard
            title="Priority 1 Controls"
            value={stats.byPriority.P1}
            subtitle="Non-negotiable for go-live"
            icon={AlertTriangle}
            iconColor="text-red-600"
            iconBg="bg-red-50"
          />
          <DashboardMetricCard
            title="Average Maturity"
            value={`L${stats.averageMaturity}`}
            subtitle="Current across all controls"
            icon={BarChart3}
            iconColor="text-violet-600"
            iconBg="bg-violet-50"
          />
          <DashboardMetricCard
            title="Evidence Verified"
            value={stats.byEvidenceReadiness.Verified}
            subtitle={`${stats.byEvidenceReadiness.Missing} still missing`}
            icon={BookOpen}
            iconColor="text-green-600"
            iconBg="bg-green-50"
          />
        </div>

        {/* Implementation status row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Implemented", count: stats.byStatus.Implemented, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "In Progress", count: stats.byStatus["In Progress"], icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Needs Review", count: stats.byStatus["Needs Review"], icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Not Started", count: stats.byStatus["Not Started"], icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
          ].map(({ label, count, icon, color, bg }) => (
            <DashboardMetricCard key={label} title={label} value={count} icon={icon} iconColor={color} iconBg={bg} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Maturity radar */}
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Maturity by Domain</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748b" }} />
                  <Radar name="Maturity" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Evidence pie */}
          <Card>
            <CardHeader><CardTitle>Evidence Readiness</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={evidenceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {evidenceData.map((e) => (
                      <Cell key={e.name} fill={evidenceColors[e.name] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Priority bar */}
          <Card>
            <CardHeader><CardTitle>Controls by Priority</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={priorityData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {priorityData.map((e) => <Cell key={e.name} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Maturity heatmap + top gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {domains.map((domain) => (
                  <div key={domain.id}>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{domain.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {domain.subdomains.flatMap((sub) =>
                        sub.controls.map((cid) => {
                          const ctrl = allControls.find((c) => c.id === cid);
                          if (!ctrl) return null;
                          return (
                            <Link key={cid} href={`/framework/${cid}`}>
                              <div
                                className={cn(
                                  "heatmap-cell w-12 h-10 rounded flex flex-col items-center justify-center text-white text-center",
                                  HEATMAP_COLORS[ctrl.currentMaturity]
                                )}
                                title={`${ctrl.controlNumber}: ${ctrl.title}\nCurrent: L${ctrl.currentMaturity} | Target: L${ctrl.targetMaturity}`}
                              >
                                <span className="text-[9px] font-bold leading-none">{ctrl.controlNumber}</span>
                                <span className="text-[10px] font-bold">L{ctrl.currentMaturity}</span>
                              </div>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4 flex-wrap text-xs text-slate-500">
                {[1,2,3,4,5].map((l) => (
                  <span key={l} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${HEATMAP_COLORS[l]} text-white`}>
                    L{l}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top gaps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Maturity Gaps</CardTitle>
                <Link href="/assessment" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  View all →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y divide-slate-50">
                {gapControls.map((ctrl) => (
                  <Link key={ctrl.id} href={`/framework/${ctrl.id}`} className="flex items-center justify-between py-3 hover:bg-slate-50 -mx-2 px-2 rounded transition-colors">
                    <div className="flex items-center gap-3">
                      <PriorityBadge priority={ctrl.priority} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{ctrl.controlNumber} {ctrl.title}</p>
                        <p className="text-xs text-slate-500">{ctrl.domain}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <MaturityBadge level={ctrl.currentMaturity} showLabel={false} size="sm" />
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                      <MaturityBadge level={ctrl.targetMaturity} showLabel={false} size="sm" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick links */}
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: "/framework?priority=P1", label: "Priority 1 Controls", icon: AlertTriangle, color: "text-red-600", desc: "View critical controls" },
                { href: "/assessment", label: "Maturity Assessment", icon: BarChart3, color: "text-blue-600", desc: "Assess your current state" },
                { href: "/evidence", label: "Evidence Checklist", icon: BookOpen, color: "text-green-600", desc: "Review missing evidence" },
                { href: "/roadmap", label: "Remediation Roadmap", icon: TrendingUp, color: "text-violet-600", desc: "Plan your implementation" },
              ].map(({ href, label, icon: Icon, color, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex flex-col gap-2 p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all bg-white h-full">
                    <Icon className={cn("h-5 w-5", color)} />
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
