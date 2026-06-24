"use client";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaturityBadge } from "@/components/MaturityBadge";
import {
  ShieldCheck, AlertTriangle, BarChart3, BookOpen,
  ArrowRight, TrendingUp, CheckCircle2, XCircle, Clock, Flame, CalendarX, Target,
} from "lucide-react";
import { allControls, domains } from "@/data";
import { MATURITY_COLORS, DOMAIN_COLORS, CRITICALITY_STYLES, getComplianceScore, cn } from "@/lib/utils";
import { useOverrides } from "@/context/ControlOverridesContext";
import type { Control, Criticality, MaturityLevel } from "@/types";

const HEATMAP_COLORS: Record<number, string> = {
  1: "bg-red-400",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-green-400",
  5: "bg-teal-500",
};

const CRITICALITY_ORDER: Criticality[] = ["Critical", "High", "Medium", "Low", "Not Applicable"];
const CRITICALITY_COLORS: Record<Criticality, string> = {
  Critical: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#22c55e",
  "Not Applicable": "#94a3b8",
};

const DOMAIN_SHORT: Record<string, string> = {
  "Information Technology Governance and Leadership": "IT Gov & Leadership",
  "IT Risk Management": "IT Risk Mgmt",
  "Operations Management": "Operations Mgmt",
  "System Change Management": "System Change Mgmt",
};

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

export default function DashboardPage() {
  const { overrides } = useOverrides();

  const getEffective = (ctrl: Control) => {
    const o = overrides[ctrl.id];
    return {
      currentMaturity: o?.currentMaturity ?? ctrl.currentMaturity,
      targetMaturity: o?.targetMaturity ?? ctrl.targetMaturity,
      implementationStatus: o?.implementationStatus ?? ctrl.implementationStatus,
      evidenceReadiness: o?.evidenceReadiness ?? ctrl.evidenceReadiness,
      criticality: o?.criticality,
      targetDate: o?.targetDate,
    };
  };

  const totalControls = allControls.length;

  const complianceScore = useMemo(() => getComplianceScore(allControls, overrides), [overrides]);

  const avgMaturity = useMemo(() => {
    const sum = allControls.reduce((s, c) => s + getEffective(c).currentMaturity, 0);
    return Math.round((sum / totalControls) * 10) / 10;
  }, [overrides]);

  const evidenceStats = useMemo(() => {
    const counts = { Missing: 0, Partial: 0, Available: 0, Verified: 0 };
    allControls.forEach((c) => { counts[getEffective(c).evidenceReadiness]++; });
    return counts;
  }, [overrides]);

  const statusStats = useMemo(() => {
    const counts = { "Not Started": 0, "In Progress": 0, Implemented: 0, "Needs Review": 0 };
    allControls.forEach((c) => { counts[getEffective(c).implementationStatus]++; });
    return counts;
  }, [overrides]);

  const overdueCount = useMemo(() =>
    allControls.filter((c) => {
      const eff = getEffective(c);
      if (!eff.targetDate || eff.implementationStatus === "Implemented") return false;
      return new Date(eff.targetDate) < TODAY;
    }).length,
    [overrides]
  );

  const domainMaturity = useMemo(() =>
    domains.map((d) => {
      const ctrls = allControls.filter((c) => c.domainId === d.id);
      const avg = ctrls.length
        ? ctrls.reduce((s, c) => s + getEffective(c).currentMaturity, 0) / ctrls.length
        : 0;
      return {
        name: DOMAIN_SHORT[d.name] ?? d.name,
        avg: Math.round(avg * 10) / 10,
      };
    }),
    [overrides]
  );

  const criticalityData = useMemo(() => {
    const counts: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0, "Not Applicable": 0, "Not Set": 0 };
    allControls.forEach((c) => {
      const crit = getEffective(c).criticality;
      counts[crit ?? "Not Set"]++;
    });
    return [
      ...CRITICALITY_ORDER.map((c) => ({ name: c, value: counts[c], fill: CRITICALITY_COLORS[c] })),
      { name: "Not Set", value: counts["Not Set"], fill: "#e2e8f0" },
    ].filter((d) => d.value > 0);
  }, [overrides]);

  const allUnset = criticalityData.length === 0 || (criticalityData.length === 1 && criticalityData[0].name === "Not Set");

  const evidencePie = useMemo(() =>
    Object.entries(evidenceStats).map(([name, value]) => ({ name, value })),
    [evidenceStats]
  );
  const evidenceColors: Record<string, string> = {
    Missing: "#ef4444", Partial: "#f59e0b", Available: "#3b82f6", Verified: "#22c55e",
  };

  const gapControls = useMemo(() =>
    allControls
      .filter((c) => { const e = getEffective(c); return e.targetMaturity > e.currentMaturity; })
      .sort((a, b) => {
        const ga = getEffective(a).targetMaturity - getEffective(a).currentMaturity;
        const gb = getEffective(b).targetMaturity - getEffective(b).currentMaturity;
        return gb - ga;
      })
      .slice(0, 5),
    [overrides]
  );

  const totalGapCount = useMemo(() =>
    allControls.filter((c) => { const e = getEffective(c); return e.targetMaturity > e.currentMaturity; }).length,
    [overrides]
  );

  const scoreColor = complianceScore >= 80 ? "text-green-700" : complianceScore >= 60 ? "text-amber-600" : "text-red-600";
  const scoreIcon = complianceScore >= 80 ? "bg-green-50" : complianceScore >= 60 ? "bg-amber-50" : "bg-red-50";
  const scoreIconColor = complianceScore >= 80 ? "text-green-700" : complianceScore >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Compliance Dashboard"
        subtitle="SAMA ITGF compliance posture · Data reflects your saved assessments"
        actions={
          <Button asChild size="sm">
            <Link to="/assessment">
              Go to Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="p-6 flex flex-col gap-6">

        {/* Row 1: Core metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Total Controls"
            value={totalControls}
            subtitle={`Across ${domains.length} domains`}
            icon={ShieldCheck}
            iconColor="text-green-700"
            iconBg="bg-green-50"
          />
          <DashboardMetricCard
            title="Compliance Score"
            value={`${complianceScore}%`}
            subtitle="Controls at or above target maturity"
            icon={Target}
            iconColor={scoreIconColor}
            iconBg={scoreIcon}
          />
          <DashboardMetricCard
            title="Evidence Verified"
            value={evidenceStats.Verified}
            subtitle={`${evidenceStats.Missing} still missing`}
            icon={BookOpen}
            iconColor="text-green-600"
            iconBg="bg-green-50"
          />
          <DashboardMetricCard
            title="Maturity Gaps"
            value={totalGapCount}
            subtitle="Controls below target"
            icon={AlertTriangle}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
        </div>

        {/* Row 2: Implementation status + overdue */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Implemented", count: statusStats.Implemented, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "In Progress", count: statusStats["In Progress"], icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Needs Review", count: statusStats["Needs Review"], icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Not Started", count: statusStats["Not Started"], icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
          ].map(({ label, count, icon, color, bg }) => (
            <DashboardMetricCard key={label} title={label} value={count} icon={icon} iconColor={color} iconBg={bg} />
          ))}
          <Link to="/assessment?filter=overdue">
            <DashboardMetricCard
              title="Overdue"
              value={overdueCount}
              subtitle="Targets past due date"
              icon={CalendarX}
              iconColor={overdueCount > 0 ? "text-red-600" : "text-slate-400"}
              iconBg={overdueCount > 0 ? "bg-red-50" : "bg-slate-50"}
            />
          </Link>
        </div>

        {/* Row 3: Domain maturity + Criticality + Evidence charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Domain-wise maturity */}
          <Card>
            <CardHeader><CardTitle>Domain-wise Maturity</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={domainMaturity} layout="vertical" barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} tickCount={6} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} width={120} />
                  <Tooltip formatter={(v) => [`L${v}`, "Avg Maturity"]} />
                  <Bar dataKey="avg" radius={[0, 4, 4, 0]}>
                    {domainMaturity.map((_, i) => (
                      <Cell key={i} fill={["#006B3F", "#22c55e", "#059669", "#10b981"][i % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Criticality distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500" /> Criticality Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allUnset ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 text-slate-400">
                  <Flame className="h-8 w-8 text-slate-200" />
                  <p className="text-sm text-center text-slate-500">
                    No criticality set yet.
                  </p>
                  <Link to="/framework">
                    <Button variant="outline" size="sm" className="text-xs">
                      Set criticality in Framework Explorer →
                    </Button>
                  </Link>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={criticalityData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {criticalityData.map((e) => <Cell key={e.name} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Evidence readiness pie */}
          <Card>
            <CardHeader><CardTitle>Evidence Readiness</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={evidencePie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {evidencePie.map((e) => (
                      <Cell key={e.name} fill={evidenceColors[e.name] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Heatmap + Top Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Compliance heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Heatmap</CardTitle>
              <p className="text-xs text-slate-400">Current maturity level per control</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {domains.map((domain) => (
                  <div key={domain.id}>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      {DOMAIN_SHORT[domain.name] ?? domain.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.subdomains.flatMap((sub) =>
                        sub.controls.map((cid) => {
                          const ctrl = allControls.find((c) => c.id === cid);
                          if (!ctrl) return null;
                          const eff = getEffective(ctrl);
                          return (
                            <Link key={cid} to={`/framework/${cid}`}>
                              <div
                                className={cn(
                                  "heatmap-cell w-11 h-9 rounded flex flex-col items-center justify-center text-white text-center",
                                  HEATMAP_COLORS[eff.currentMaturity]
                                )}
                                title={`${ctrl.controlNumber}: ${ctrl.title}\nCurrent: L${eff.currentMaturity} | Target: L${eff.targetMaturity}`}
                              >
                                <span className="text-[8px] font-bold leading-none">{ctrl.controlNumber}</span>
                                <span className="text-[10px] font-bold">L{eff.currentMaturity}</span>
                              </div>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4 flex-wrap text-xs text-white">
                {[1, 2, 3, 4, 5].map((l) => (
                  <span key={l} className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded", HEATMAP_COLORS[l])}>
                    L{l}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top maturity gaps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Maturity Gaps</CardTitle>
                <Link to="/assessment" className="text-xs font-medium hover:underline" style={{ color: "#006B3F" }}>
                  View all →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y divide-slate-50">
                {gapControls.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">No maturity gaps — all controls are at or above target.</p>
                ) : (
                  gapControls.map((ctrl) => {
                    const eff = getEffective(ctrl);
                    const criticality = eff.criticality;
                    return (
                      <Link key={ctrl.id} to={`/framework/${ctrl.id}`} className="flex items-center justify-between py-3 hover:bg-slate-50 -mx-2 px-2 rounded transition-colors">
                        <div className="flex items-center gap-3">
                          {criticality ? (
                            <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5", CRITICALITY_STYLES[criticality])}>
                              <Flame className="h-3 w-3" />{criticality}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-300 w-16">—</span>
                          )}
                          <div>
                            <p className="text-sm font-medium text-slate-900">{ctrl.controlNumber} {ctrl.title}</p>
                            <p className="text-xs text-slate-500">{DOMAIN_SHORT[ctrl.domain] ?? ctrl.domain}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <MaturityBadge level={eff.currentMaturity as MaturityLevel} showLabel={false} size="sm" />
                          <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                          <MaturityBadge level={eff.targetMaturity as MaturityLevel} showLabel={false} size="sm" />
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Quick actions */}
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: "/framework", label: "Framework Explorer", icon: ShieldCheck, color: "text-green-700", desc: "Browse all 35 controls" },
                { href: "/assessment", label: "Maturity Assessment", icon: BarChart3, color: "text-violet-600", desc: "Update and save assessments" },
                { href: "/evidence", label: "Evidence Library", icon: BookOpen, color: "text-green-600", desc: "Review missing evidence" },
                { href: "/roadmap", label: "Remediation Roadmap", icon: TrendingUp, color: "text-blue-600", desc: "Plan your implementation" },
              ].map(({ href, label, icon: Icon, color, desc }) => (
                <Link key={href} to={href}>
                  <div className="flex flex-col gap-2 p-4 rounded-lg border border-slate-100 hover:border-green-200 hover:shadow-sm transition-all bg-white h-full">
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
