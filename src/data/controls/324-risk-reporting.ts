import type { Control } from "@/types";

export const control324: Control = {
  id: "ctrl-324",
  controlNumber: "3.2.4",
  title: "Risk Reporting, Monitoring and Profiling",
  domain: "IT Risk Management",
  domainId: "dom-32",
  subdomain: "IT Risk Management Framework",
  subdomainId: "sub-321",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "Not Started",
  evidenceReadiness: "Missing",
  primaryOwner: "IT Risk Manager",
  supportingStakeholders: ["CIO", "Board Technology Committee", "IT Governance Head", "Compliance Officer", "Internal Audit"],

  plainEnglishInterpretation:
    "The bank must systematically monitor IT risk levels and report them to the appropriate governance bodies on a defined schedule. This includes maintaining a risk profile that shows trends over time, flagging emerging risks, and ensuring Board-level visibility of the bank's overall IT risk posture.",
  samaIntent:
    "SAMA needs to see that IT risk reporting is regular, structured, and reaches the right people. A risk register that is never reported or acted upon is evidence of immature risk management. SAMA expects the Board to be able to articulate the bank's top IT risks at any point.",
  whyItMatters:
    "Without structured risk reporting, governance bodies cannot make informed decisions about risk tolerance, investment priorities, or remediation urgency. Risk management becomes a back-office function disconnected from strategic decisions.",
  riskIfNotImplemented:
    "Board-level blindness to technology risk, uninformed strategic decisions, inability to evidence active risk oversight to SAMA, and cumulative risk build-up that goes unnoticed until a major incident.",

  requiredCapabilities: [
    { id: "cap-324-1", name: "IT Risk Reporting Framework", description: "A documented reporting framework defining what risk information is reported, to whom, at what frequency, and in what format.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "Power BI"], targetMaturity: 3, dependencies: ["IT risk register", "Governance committee structures"] },
    { id: "cap-324-2", name: "IT Risk Profile Dashboard", description: "A real-time dashboard showing the bank's current IT risk profile including risk scores, trends, top risks, and treatment status.", owner: "IT Risk Manager", relatedTools: ["Power BI", "GRC tool", "Tableau"], targetMaturity: 4, dependencies: ["GRC tool", "Risk scoring model"] },
    { id: "cap-324-3", name: "IT Risk Monitoring Process", description: "Continuous monitoring of key risk indicators (KRIs) to detect deterioration in the IT risk environment between formal reporting cycles.", owner: "IT Risk Manager", relatedTools: ["SIEM", "GRC tool", "Monitoring platforms"], targetMaturity: 4, dependencies: ["KRI definitions", "GRC tool"] },
  ],

  actions: [
    { id: "act-324-pr1", category: "Process", title: "Define IT Risk Reporting Framework", description: "Document what risk reports are required, at what frequency, for which governance bodies, and in what format.", owner: "IT Risk Manager", stakeholders: ["CIO", "IT Governance Head", "Board Secretary"], priority: "P1", effort: "3 weeks", dependency: "Governance committee structures", evidenceProduced: "Risk reporting framework document" },
    { id: "act-324-pr2", category: "Process", title: "Define Key Risk Indicators (KRIs) for IT", description: "Establish a set of measurable KRIs for each material IT risk category, with threshold values that trigger escalation.", owner: "IT Risk Manager", stakeholders: ["CISO", "IT Operations Head", "Enterprise Architect"], priority: "P1", effort: "4 weeks", dependency: "Risk framework and register", evidenceProduced: "KRI catalogue with thresholds" },
    { id: "act-324-p1", category: "People", title: "Embed IT Risk Reporting into Committee Agendas", description: "Work with committee secretaries to embed structured IT risk reporting as a standing agenda item for the IT Risk Committee and Board Technology Committee.", owner: "IT Risk Manager", stakeholders: ["Board Secretary", "IT Governance Head"], priority: "P1", effort: "2 weeks", dependency: "Reporting framework defined", evidenceProduced: "Updated committee agendas and ToR" },
    { id: "act-324-t1", category: "Technology", title: "Build IT Risk Profile Dashboard", description: "Develop a management-ready IT risk dashboard that can be shown to the Board Technology Committee, showing current risk profile, trends, and treatment progress.", owner: "IT Risk Manager", stakeholders: ["IT Governance Head", "CIO"], priority: "P1", effort: "6 weeks", dependency: "GRC tool with risk data", evidenceProduced: "Dashboard screenshots, Board pack" },
    { id: "act-324-t2", category: "Technology", title: "Implement KRI Monitoring Automation", description: "Configure automated KRI monitoring in the GRC/monitoring tool to alert when KRI thresholds are breached.", owner: "IT Risk Manager", stakeholders: ["IT Operations Head", "CISO"], priority: "P2", effort: "2 months", dependency: "KRI definitions, GRC tool", evidenceProduced: "KRI monitoring alerts, threshold breach records" },
  ],

  raciMatrix: [
    { activity: "Define IT risk reporting framework", boardTechnologyCommittee: "I", cio: "A", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "C", internalAudit: "C", pmo: "I", vendorManager: "I" },
    { activity: "Produce and distribute IT risk reports", boardTechnologyCommittee: "A", cio: "C", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "I", enterpriseArchitect: "I", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
    { activity: "Monitor KRIs and escalate breaches", boardTechnologyCommittee: "I", cio: "A", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "I", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-324-1", question: "Show me your most recent IT risk report presented to the Board. What did it cover?", whySamaMayAsk: "SAMA directly assesses Board-level risk visibility by reviewing actual reporting artefacts.", expectedAnswer: "Here is our last quarterly Board IT risk report. It covers our current risk profile by category, top 10 risks with treatment status, KRI trends, new risks identified since the last report, and risks requiring Board awareness.", supportingEvidence: ["Latest Board IT risk report", "Board committee minutes", "Risk dashboard"] },
    { id: "aq-324-2", question: "What Key Risk Indicators do you track and how do you respond when a KRI breaches its threshold?", whySamaMayAsk: "SAMA tests whether risk monitoring is automated and responsive.", expectedAnswer: "We track [X] KRIs covering availability, security events, change failure rate, third-party incidents, and data quality metrics. KRI breaches automatically alert the IT Risk Manager. Material breaches are escalated to the CIO within 4 hours.", supportingEvidence: ["KRI catalogue", "KRI monitoring screenshots", "Escalation records"] },
    { id: "aq-324-3", question: "How do you ensure your IT risk reporting is accurate and not manipulated?", whySamaMayAsk: "SAMA checks the integrity of the risk reporting process.", expectedAnswer: "IT risk data flows directly from our GRC tool to the dashboard – there is no manual intervention. Internal Audit independently reviews the IT risk register and reporting process quarterly. The GRC tool has audit trails for all changes.", supportingEvidence: ["GRC audit trail", "Internal Audit review records", "System access controls"] },
  ],

  evidenceChecklist: [
    { id: "ev-324-1", name: "IT Risk Reporting Framework Document", description: "Document defining reporting schedule, format, content, and distribution for IT risk reports.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-324", domain: "IT Risk Management" },
    { id: "ev-324-2", name: "IT Risk Reports (Last 4 Quarters)", description: "Quarterly IT risk reports presented to the Board Technology Committee or IT Risk Committee.", type: "Report", owner: "IT Risk Manager", updateFrequency: "Quarterly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-324", domain: "IT Risk Management" },
    { id: "ev-324-3", name: "IT Risk Profile Dashboard", description: "Real-time dashboard showing current IT risk profile.", type: "Report", owner: "IT Risk Manager", updateFrequency: "Real-time", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-324", domain: "IT Risk Management" },
    { id: "ev-324-4", name: "KRI Catalogue and Thresholds", description: "List of Key Risk Indicators with defined threshold values and escalation procedures.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-324", domain: "IT Risk Management" },
    { id: "ev-324-5", name: "KRI Breach Records", description: "Records of KRI threshold breaches and the escalation and response actions taken.", type: "Record", owner: "IT Risk Manager", updateFrequency: "As required", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-324", domain: "IT Risk Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No formal IT risk reporting. Risk information is shared ad hoc when problems occur.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define reporting audience", "Create basic risk report template", "Establish reporting frequency"] },
    { level: 2, label: "Developing", description: "Ad hoc IT risk reports produced but not on a defined schedule. Not reaching the Board.", documentationExpected: ["Basic risk report templates"], operatingEvidenceExpected: [], gapsToClose: ["Define formal reporting calendar", "Add Board Technology Committee reporting", "Define KRIs"] },
    { level: 3, label: "Defined", description: "Formal IT risk reporting to IT Risk Committee and Board Technology Committee on defined schedule. KRIs defined.", documentationExpected: ["Reporting framework", "KRI catalogue"], operatingEvidenceExpected: ["Quarterly reports", "Committee minutes"], gapsToClose: ["Automate dashboard", "Configure KRI monitoring alerts"] },
    { level: 4, label: "Managed", description: "Risk reporting is automated from GRC tool. KRI monitoring is real-time with automated alerts. Board receives data-driven risk pack. SAMA would accept this.", documentationExpected: ["All L3 + GRC configuration"], operatingEvidenceExpected: ["Dashboard screenshots", "KRI alerts", "Board reports"], gapsToClose: ["Introduce predictive risk reporting"] },
    { level: 5, label: "Optimised", description: "Risk reporting includes predictive analytics, scenario modelling, and peer benchmarking. Risk information is embedded in executive decision-making.", documentationExpected: ["All L4 + benchmarking"], operatingEvidenceExpected: ["Predictive reports", "Scenario analyses"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-324-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Assess current IT risk reporting practices", owner: "IT Risk Manager", dependency: "None", deliverable: "Assessment report", evidenceProduced: "Gap report" },
    { id: "rm-324-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Define IT risk reporting framework and KRI catalogue", owner: "IT Risk Manager", dependency: "Risk register and framework", deliverable: "Reporting framework, KRI catalogue", evidenceProduced: "Framework document, KRI list" },
    { id: "rm-324-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Build IT risk dashboard and integrate with GRC tool", owner: "IT Risk Manager", dependency: "GRC tool configured", deliverable: "IT risk dashboard", evidenceProduced: "Dashboard screenshots" },
    { id: "rm-324-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Deliver quarterly IT risk reports to Board Technology Committee", owner: "IT Risk Manager", dependency: "Dashboard live, committees established", deliverable: "Quarterly Board risk reports", evidenceProduced: "Reports, committee minutes" },
    { id: "rm-324-5", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Monitor KRIs and evidence breach response", owner: "IT Risk Manager", dependency: "KRI monitoring configured", deliverable: "KRI monitoring records", evidenceProduced: "KRI breach logs, escalation records" },
  ],

  commonGaps: [
    "Risk is reported to the IT Steering Committee but never formally reaches the Board Technology Committee",
    "KRIs are defined in a document but not monitored – they are only checked when preparing for SAMA reviews",
    "IT risk reports are produced but are dense technical documents not suited for Board consumption",
    "Risk trends over time are not tracked – every report shows a snapshot without comparison to prior periods",
    "Risk reporting is manual and time-consuming, creating delays and errors in Board packs",
  ],
  relatedControls: ["3.2.1", "3.2.2", "3.2.3", "3.1.6"],
};
