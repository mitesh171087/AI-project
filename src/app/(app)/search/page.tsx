"use client";
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { SearchBar } from "@/components/SearchBar";
import { PriorityBadge } from "@/components/PriorityBadge";
import { MaturityBadge } from "@/components/MaturityBadge";
import { EvidenceBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { allControls, allEvidenceItems } from "@/data";
import { Search, FileText, Layers, HelpCircle } from "lucide-react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  const controlResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allControls.filter(
      (c) =>
        c.controlNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.plainEnglishInterpretation.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.primaryOwner.toLowerCase().includes(q) ||
        c.requiredCapabilities.some((cap) => cap.name.toLowerCase().includes(q)) ||
        c.auditQuestions.some((aq) => aq.question.toLowerCase().includes(q))
    );
  }, [query]);

  const evidenceResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allEvidenceItems.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.owner.toLowerCase().includes(q)
    );
  }, [query]);

  const auditResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allControls.flatMap((c) =>
      c.auditQuestions
        .filter((aq) => aq.question.toLowerCase().includes(q) || aq.expectedAnswer.toLowerCase().includes(q))
        .map((aq) => ({ ...aq, control: c }))
    );
  }, [query]);

  const totalResults = controlResults.length + evidenceResults.length + auditResults.length;

  return (
    <div className="flex flex-col">
      <AppHeader title="Global Search" subtitle="Search across all SAMA ITGF controls, evidence, and audit questions" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <SearchBar value={query} onChange={setQuery} placeholder="Search controls, evidence, audit questions, capabilities…" />

          {!query.trim() ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <Search className="h-10 w-10 text-slate-300" />
                <p className="text-slate-500 font-medium">Enter a search term to explore the SAMA ITGF framework</p>
                <p className="text-xs text-slate-400">Search by control number, title, keyword, capability, owner, or evidence type</p>
              </CardContent>
            </Card>
          ) : totalResults === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <Search className="h-10 w-10 text-slate-300" />
                <p className="text-slate-500 font-medium">No results found for &ldquo;{query}&rdquo;</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <p className="text-sm text-slate-500">{totalResults} results for &ldquo;{query}&rdquo;</p>

              {controlResults.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Layers className="h-4 w-4 text-blue-500" /> Controls ({controlResults.length})
                  </h2>
                  <div className="flex flex-col gap-2">
                    {controlResults.map((ctrl) => (
                      <Link key={ctrl.id} to={`/framework/${ctrl.id}`}>
                        <Card className="hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                          <CardContent className="p-4 flex items-start justify-between gap-3">
                            <div className="flex flex-col gap-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{ctrl.controlNumber}</span>
                                <PriorityBadge priority={ctrl.priority} />
                              </div>
                              <p className="text-sm font-semibold text-slate-900">{ctrl.title}</p>
                              <p className="text-xs text-slate-500">{ctrl.domain} › {ctrl.subdomain}</p>
                              <p className="text-xs text-slate-600 line-clamp-2 mt-1">{ctrl.plainEnglishInterpretation}</p>
                            </div>
                            <div className="flex flex-col gap-1.5 shrink-0">
                              <MaturityBadge level={ctrl.currentMaturity} showLabel={false} size="sm" />
                              <EvidenceBadge status={ctrl.evidenceReadiness} />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {evidenceResults.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <FileText className="h-4 w-4 text-green-500" /> Evidence Items ({evidenceResults.length})
                  </h2>
                  <div className="flex flex-col gap-2">
                    {evidenceResults.slice(0, 10).map((ev) => {
                      const ctrl = allControls.find((c) => c.id === ev.controlId);
                      return (
                        <Card key={ev.id} className={ctrl ? "hover:shadow-md hover:border-blue-200 transition-all cursor-pointer" : ""}>
                          <CardContent className="p-4">
                            <Link to={ctrl ? `/framework/${ctrl.id}?tab=evidence` : "/evidence"}>
                              <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">{ev.name}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{ev.description}</p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-xs text-slate-400">{ev.type} · {ev.owner}</span>
                                    <EvidenceBadge status={ev.status} />
                                    {ctrl && <span className="text-xs text-blue-600 font-mono">{ctrl.controlNumber}</span>}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              )}

              {auditResults.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <HelpCircle className="h-4 w-4 text-violet-500" /> Audit Questions ({auditResults.length})
                  </h2>
                  <div className="flex flex-col gap-2">
                    {auditResults.slice(0, 8).map((aq) => (
                      <Link key={aq.id} to={`/framework/${aq.control.id}?tab=audit`}>
                        <Card className="hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-slate-900">{aq.question}</p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{aq.expectedAnswer}</p>
                                <span className="text-xs text-blue-600 font-mono mt-1 inline-block">{aq.control.controlNumber} – {aq.control.title}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
