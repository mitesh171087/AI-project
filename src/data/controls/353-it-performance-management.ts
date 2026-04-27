import type { Control } from "@/types";

export const control353: Control = {
  id: "ctrl-353",
  controlNumber: "3.5.3",
  title: "IT Performance Management",
  domain: "IT Human Capital",
  domainId: "dom-35",
  subdomain: "IT Human Capital Management",
  subdomainId: "sub-351",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "CIO",
  supportingStakeholders: ["CHRO", "IT Leadership Team"],

  plainEnglishInterpretation:
    "The bank must have a formal performance management process for IT staff that sets clear objectives aligned to IT strategy and SAMA obligations, measures performance against those objectives, and links performance outcomes to development and reward decisions.",
  samaIntent:
    "SAMA expects accountable IT leadership. Where individual accountability is not enforced through performance management, governance frameworks lose effectiveness. Setting and measuring performance objectives tied to IT risk and compliance outcomes demonstrates the bank is serious about individual accountability.",
  whyItMatters:
    "Without clear performance objectives for IT staff that include risk and compliance measures, individuals are not accountable for compliance outcomes. Performance management creates the human accountability dimension of IT governance that gives SAMA confidence that frameworks are operationally enforced.",
  riskIfNotImplemented:
    "Lack of individual accountability for IT compliance and risk outcomes, poor retention of top IT talent due to unclear career progression, and inability to demonstrate to SAMA that governance accountability extends to the individual level.",

  requiredCapabilities: [
    {
      id: "cap-353-1",
      name: "IT Performance Objectives Framework",
      description: "Framework for setting IT staff performance objectives that include technical, service delivery, risk management, and compliance measures.",
      owner: "CIO",
      relatedTools: ["HR management system", "Performance management platform"],
      targetMaturity: 3,
      dependencies: ["IT Competency Framework", "HR performance framework"],
    },
    {
      id: "cap-353-2",
      name: "IT KPI and Accountability Alignment",
      description: "Alignment of individual IT performance objectives to IT department KPIs and SAMA compliance metrics.",
      owner: "CIO",
      relatedTools: ["HR system", "KPI framework"],
      targetMaturity: 3,
      dependencies: ["Performance objectives", "IT KPI framework"],
    },
  ],

  actions: [
    {
      id: "act-353-pr1",
      category: "Process",
      title: "Define IT Performance Objectives Standard",
      description: "Define standards for IT staff performance objectives including mandatory compliance and risk management components linked to SAMA obligations.",
      owner: "CIO",
      stakeholders: ["CHRO", "IT Governance Head"],
      priority: "P2",
      effort: "4 weeks",
      dependency: "HR performance framework",
      evidenceProduced: "IT Performance Objectives Standard",
    },
    {
      id: "act-353-pr2",
      category: "Process",
      title: "Conduct Annual IT Performance Reviews",
      description: "Ensure all IT staff complete formal annual performance reviews with documented objectives, mid-year check-ins, and end-year assessments.",
      owner: "CIO",
      stakeholders: ["CHRO", "IT Leadership Team"],
      priority: "P2",
      effort: "Ongoing",
      dependency: "Performance objectives standard",
      evidenceProduced: "Performance review completion records",
    },
  ],

  raciMatrix: [
    {
      activity: "Set and review IT staff performance objectives",
      boardTechnologyCommittee: "I",
      cio: "R",
      cto: "R",
      itGovernanceHead: "C",
      itRiskManager: "C",
      ciso: "R",
      enterpriseArchitect: "I",
      itOperationsHead: "R",
      applicationOwner: "I",
      infrastructureOwner: "I",
      complianceOfficer: "I",
      internalAudit: "I",
      pmo: "I",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-353-1",
      question: "How does the bank ensure individual IT staff are accountable for IT risk and compliance performance?",
      whySamaMayAsk: "SAMA expects governance accountability to be embedded at the individual level through performance management, not just organisational policy.",
      expectedAnswer: "All IT staff have annual performance objectives that include specific compliance and risk management measures. These are reviewed mid-year and at year-end. Compliance-related failures can affect performance ratings and, where serious, are subject to disciplinary processes.",
      supportingEvidence: ["Performance objectives template", "Performance review completion records", "IT KPI linkage documentation"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-353-1",
      name: "IT Performance Objectives Standard",
      description: "Standard defining IT performance objective requirements including mandatory compliance components.",
      type: "Document",
      owner: "CIO",
      updateFrequency: "Annual",
      maturityLevelSupported: 2,
      status: "Missing",
      controlId: "ctrl-353",
      domain: "IT Human Capital",
    },
    {
      id: "ev-353-2",
      name: "IT Performance Review Completion Records",
      description: "Records demonstrating annual performance reviews conducted for all IT staff.",
      type: "Record",
      owner: "CIO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-353",
      domain: "IT Human Capital",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "IT performance management is informal. No structured objectives or formal reviews.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define performance objectives standard", "Implement formal reviews"] },
    { level: 2, label: "Developing", description: "Performance reviews conducted but objectives are not aligned to IT strategy or compliance requirements.", documentationExpected: ["Basic performance review process"], operatingEvidenceExpected: ["Review records"], gapsToClose: ["Align objectives to IT KPIs", "Include compliance measures"] },
    { level: 3, label: "Defined", description: "Formal performance management with objectives aligned to IT strategy, KPIs, and compliance. Annual reviews completed.", documentationExpected: ["Performance Objectives Standard", "KPI alignment documentation"], operatingEvidenceExpected: ["Completion records", "Objective evidence"], gapsToClose: ["Mid-year reviews", "Link performance to development plans"] },
    { level: 4, label: "Managed", description: "Performance data used to drive workforce development. SAMA satisfied at this level.", documentationExpected: ["All Level 3 docs", "Development planning link"], operatingEvidenceExpected: ["Mid-year reviews", "Development plan records"], gapsToClose: ["Continuous performance feedback tools"] },
    { level: 5, label: "Optimised", description: "Continuous feedback culture with real-time performance insights driving talent development.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Performance analytics reports"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-353-1", phase: 1, phaseLabel: "Design", timeline: "Month 1", activity: "Define IT Performance Objectives Standard with compliance components", owner: "CIO", dependency: "HR framework", deliverable: "Performance Objectives Standard", evidenceProduced: "Standard document" },
    { id: "rm-353-2", phase: 2, phaseLabel: "Implement", timeline: "Month 1–2", activity: "Cascade SAMA compliance objectives to all IT staff performance plans", owner: "CIO", dependency: "Standard defined", deliverable: "Updated performance plans", evidenceProduced: "Performance plan evidence" },
    { id: "rm-353-3", phase: 3, phaseLabel: "Operate", timeline: "Month 2+", activity: "Conduct annual and mid-year reviews; track completion rates", owner: "CIO", dependency: "Plans set", deliverable: "Review completion", evidenceProduced: "Review records" },
  ],

  commonGaps: [
    "IT performance objectives exist but do not include any compliance or risk management measures",
    "Annual performance reviews are not consistently completed across all IT teams",
    "IT leadership performance objectives are not linked to IT KPIs or SAMA compliance outcomes",
    "No consequence for compliance-related failures in performance assessment",
    "Performance review data is not used to drive training or development investment decisions",
  ],
  relatedControls: ["3.5.1", "3.5.2", "3.1.5"],
};
