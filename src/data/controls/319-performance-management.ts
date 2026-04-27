import type { Control } from "@/types";

export const control319: Control = {
  id: "ctrl-319",
  controlNumber: "3.1.9",
  title: "Performance Management",
  domain: "Information Technology Governance and Leadership",
  domainId: "dom-31",
  subdomain: "IT Governance and Leadership",
  subdomainId: "sub-311",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "CIO",
  supportingStakeholders: ["CTO", "CISO", "IT Governance Head", "Board Technology Committee", "All IT Heads"],

  plainEnglishInterpretation:
    "The bank must define and track key performance indicators (KPIs) for its IT function, measure performance against those indicators, and report results to senior management and the Board. IT performance management ensures the bank can demonstrate that its technology is delivering value, meeting service standards, and complying with regulatory requirements.",
  samaIntent:
    "SAMA expects banks to be able to demonstrate the performance of their IT function in objective, measurable terms. Performance management creates accountability within IT. SAMA will ask how IT performance is measured, what the current performance levels are, and what actions are being taken where performance falls below targets.",
  whyItMatters:
    "Without performance management, IT operates without accountability. Problems may be visible to IT staff but never escalated to management or the Board. Formal IT performance management ensures that service quality, risk levels, and compliance status are measured, reported, and acted upon systematically.",
  riskIfNotImplemented:
    "IT performance issues not escalated to senior management, Board unable to oversee technology effectively without objective metrics, inability to demonstrate IT value delivery to SAMA, lack of accountability within the IT function.",

  requiredCapabilities: [
    {
      id: "cap-319-1",
      name: "IT KPI Framework",
      description: "Defined set of IT KPIs covering service quality, risk, compliance, financial performance, and strategic delivery, with targets and thresholds.",
      owner: "CIO",
      relatedTools: ["Power BI", "Tableau", "ServiceNow dashboards"],
      targetMaturity: 3,
      dependencies: ["IT Strategy", "IT governance framework"],
    },
    {
      id: "cap-319-2",
      name: "IT Performance Reporting",
      description: "Regular (monthly/quarterly) IT performance reports presented to IT Steering Committee, ExCo, and Board Technology Committee.",
      owner: "CIO",
      relatedTools: ["Power BI", "Excel", "Board reporting tools"],
      targetMaturity: 3,
      dependencies: ["KPI framework", "Data sources"],
    },
    {
      id: "cap-319-3",
      name: "Performance Improvement Process",
      description: "Formal process to investigate root causes of KPI breaches and implement corrective actions with tracking to closure.",
      owner: "CIO",
      relatedTools: ["ServiceNow", "Jira", "Action tracking tool"],
      targetMaturity: 3,
      dependencies: ["KPI framework", "Management governance"],
    },
  ],

  actions: [
    {
      id: "act-319-pr1",
      category: "Process",
      title: "Define IT KPI Framework",
      description: "Develop a comprehensive IT KPI framework covering all major IT domains with targets agreed by the IT Steering Committee and Board Technology Committee.",
      owner: "CIO",
      stakeholders: ["Board Technology Committee", "IT Steering Committee"],
      priority: "P1",
      effort: "6 weeks",
      dependency: "IT Strategy in place",
      evidenceProduced: "IT KPI Framework document",
    },
    {
      id: "act-319-pr2",
      category: "Process",
      title: "Implement Monthly IT Performance Reporting",
      description: "Establish a monthly IT performance reporting cycle delivering dashboards to IT Steering Committee and quarterly summary to Board Technology Committee.",
      owner: "CIO",
      stakeholders: ["IT Steering Committee", "Board Technology Committee"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "KPI framework defined",
      evidenceProduced: "Monthly IT performance reports, Board reporting pack",
    },
  ],

  raciMatrix: [
    {
      activity: "Define and report IT performance KPIs",
      boardTechnologyCommittee: "A",
      cio: "R",
      cto: "C",
      itGovernanceHead: "C",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "I",
      itOperationsHead: "C",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "I",
      internalAudit: "I",
      pmo: "C",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-319-1",
      question: "How does the bank measure and report IT performance, and how is this information used for governance?",
      whySamaMayAsk: "SAMA wants evidence that the Board has objective information about IT performance and that management acts on performance data.",
      expectedAnswer: "We have an IT KPI framework with targets across service quality, risk, compliance, and cost. Monthly performance dashboards are presented to the IT Steering Committee. Quarterly summaries go to the Board Technology Committee. KPI breaches trigger formal root cause analysis and corrective action.",
      supportingEvidence: ["IT KPI Framework", "Monthly performance reports", "Board Technology Committee minutes showing IT performance review", "Corrective action records"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-319-1",
      name: "IT KPI Framework",
      description: "Documented IT KPIs with targets, data sources, and reporting frequency.",
      type: "Document",
      owner: "CIO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-319",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-319-2",
      name: "Monthly IT Performance Reports",
      description: "Regular reports showing IT KPI performance against targets.",
      type: "Report",
      owner: "CIO",
      updateFrequency: "Monthly",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-319",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-319-3",
      name: "Board/ExCo IT Performance Reporting",
      description: "Evidence that IT performance is reported to and reviewed by Board Technology Committee.",
      type: "Report",
      owner: "CIO",
      updateFrequency: "Quarterly",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-319",
      domain: "Information Technology Governance and Leadership",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No formal IT KPIs. Performance is assessed anecdotally.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define basic IT KPIs", "Establish reporting cycle"] },
    { level: 2, label: "Developing", description: "Some IT metrics tracked but not formalised or regularly reported to senior management.", documentationExpected: ["Draft metrics"], operatingEvidenceExpected: ["Some reports"], gapsToClose: ["Formalise KPI framework", "Establish Board reporting"] },
    { level: 3, label: "Defined", description: "Formal KPI framework. Regular reporting to management and Board. Corrective actions tracked. SAMA expects at least this level.", documentationExpected: ["KPI Framework", "Reporting templates"], operatingEvidenceExpected: ["Monthly reports", "Board minutes"], gapsToClose: ["Automate KPI data collection", "Benchmark against peers"] },
    { level: 4, label: "Managed", description: "Automated KPI dashboards. Benchmarked against industry peers. Trend analysis drives improvement.", documentationExpected: ["All Level 3 docs", "Benchmarking data"], operatingEvidenceExpected: ["Automated dashboards", "Benchmark reports"], gapsToClose: ["Predictive performance analytics"] },
    { level: 5, label: "Optimised", description: "Real-time performance intelligence with predictive analytics and continuous improvement.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["AI-driven performance insights"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-319-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Identify current IT metrics and reporting gaps", owner: "CIO", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-319-2", phase: 2, phaseLabel: "Design", timeline: "Month 2–3", activity: "Define IT KPI framework and reporting structure", owner: "CIO", dependency: "Assessment", deliverable: "KPI Framework", evidenceProduced: "KPI document" },
    { id: "rm-319-3", phase: 3, phaseLabel: "Implement", timeline: "Month 3–5", activity: "Build dashboards and establish reporting cadence", owner: "CIO", dependency: "KPI framework", deliverable: "Monthly reporting cycle", evidenceProduced: "Monthly reports" },
  ],

  commonGaps: [
    "No formal IT KPI framework — IT performance is discussed informally without objective metrics",
    "IT performance is not reported to the Board Technology Committee — Board lacks visibility of technology performance",
    "KPIs focus on operational metrics only — no strategic or risk-based KPIs",
    "KPI breaches are noted but not formally tracked to corrective actions",
    "Data collection for KPIs is manual and inconsistent — reports cannot be relied upon",
  ],
  relatedControls: ["3.1.1", "3.1.2", "3.1.8", "3.2.4"],
};
