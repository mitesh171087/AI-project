import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Target, FileText, AlertCircle } from "lucide-react";
import type { AuditQuestion } from "@/types";

export function AuditQuestionAccordion({ questions }: { questions: AuditQuestion[] }) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-1">
      {questions.map((q, i) => (
        <AccordionItem
          key={q.id}
          value={q.id}
          className="border border-slate-100 rounded-lg px-4 bg-white"
        >
          <AccordionTrigger className="text-left font-semibold text-slate-800">
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              {q.question}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">Why SAMA may ask this</p>
                  <p className="text-sm text-slate-600">{q.whySamaMayAsk}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">Expected answer direction</p>
                  <p className="text-sm text-slate-600">{q.expectedAnswer}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">Supporting evidence</p>
                  <ul className="flex flex-col gap-0.5">
                    {q.supportingEvidence.map((e, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
