import type { Control } from "@/types";

export const control3410: Control = {
  id: "ctrl-3410",
  controlNumber: "3.4.10",
  title: "IT Project Management",
  domain: "System Change Management",
  domainId: "dom-34",
  subdomain: "System Change Management",
  subdomainId: "sub-341",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "PMO",
  supportingStakeholders: ["CIO", "CTO", "IT Governance Head", "Business Sponsors", "Enterprise Architect", "Risk Manager"],

  plainEnglishInterpretation:
    "The bank must manage its IT projects through a formal project management methodology that includes defined governance, structured planning, risk management, change control, and formal project closure. IT projects must be delivered on time, within budget, and to defined quality standards, with senior management oversight for significant technology initiatives.",
  samaIntent:
    "SAMA is concerned that large IT projects represent significant strategic and operational risk for banks. Failed or poorly managed IT projects waste capital and can introduce new risks. SAMA expects banks to apply professional project management discipline to IT initiatives, particularly those involving core banking systems, regulatory compliance, or customer-facing technology.",
  whyItMatters:
    "IT projects are the mechanism through which the bank's technology strategy is executed. Poorly governed projects overspend, over-run timelines, deliver inadequate quality, and create technical debt. For Saudi banks, regulatory IT projects have firm SAMA deadlines — project management failures can result in non-compliance.",
  riskIfNotImplemented:
    "IT project failures leading to wasted investment, missed SAMA regulatory deadlines, introduction of inadequately tested systems, inability to demonstrate technology investment governance to the Board, accumulation of technical debt from incomplete projects.",

  requiredCapabilities: [
    {
      id: "cap-3410-1",
      name: "IT Project Management Methodology",
      description: "Formal IT project management methodology (PRINCE2, PMI, or equivalent) with defined phases, governance gates, templates, and reporting requirements.",
      owner: "PMO",
      relatedTools: ["Microsoft Project", "Jira", "Azure DevOps", "Planview"],
      targetMaturity: 3,
      dependencies: ["IT Governance Framework", "Change governance process"],
    },
    {
      id: "cap-3410-2",
      name: "IT Project Portfolio",
      description: "Consolidated view of all active IT projects with status, financials, risks, and dependencies, reported regularly to the IT Steering Committee.",
      owner: "PMO",
      relatedTools: ["Planview", "ServiceNow PPM", "Microsoft Project Online"],
      targetMaturity: 3,
      dependencies: ["PM methodology", "Project reporting"],
    },
    {
      id: "cap-3410-3",
      name: "Project Risk and Issue Management",
      description: "Formal process for identifying, assessing, and managing project risks and issues, with escalation paths for critical risks.",
      owner: "PMO",
      relatedTools: ["RAID log templates", "Jira", "Confluence"],
      targetMaturity: 3,
      dependencies: ["PM methodology"],
    },
  ],

  actions: [
    {
      id: "act-3410-pr1",
      category: "Process",
      title: "Define IT Project Management Methodology",
      description: "Establish a formal IT PM methodology with standard templates, governance gates, approval authorities, and reporting requirements.",
      owner: "PMO",
      stakeholders: ["CIO", "IT Steering Committee"],
      priority: "P1",
      effort: "8 weeks",
      dependency: "None",
      evidenceProduced: "IT PM Methodology document, templates",
    },
    {
      id: "act-3410-pr2",
      category: "Process",
      title: "Establish IT Project Portfolio Reporting",
      description: "Implement monthly IT project portfolio status reporting to the IT Steering Committee covering progress, risks, financials, and issues.",
      owner: "PMO",
      stakeholders: ["CIO", "IT Steering Committee", "Business Sponsors"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "PM methodology defined",
      evidenceProduced: "Monthly portfolio reports, IT Steering Committee minutes",
    },
  ],

  raciMatrix: [
    {
      activity: "Manage IT projects to delivery",
      boardTechnologyCommittee: "A",
      cio: "A",
      cto: "C",
      itGovernanceHead: "C",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "C",
      itOperationsHead: "C",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "C",
      internalAudit: "I",
      pmo: "R",
      vendorManager: "C",
    },
  ],

  auditQuestions: [
    {
      id: "aq-3410-1",
      question: "How does the bank govern its IT projects and ensure they are delivered on time, on budget, and to quality standards?",
      whySamaMayAsk: "SAMA wants to verify that IT projects are professionally managed and governed, particularly large or regulatory projects.",
      expectedAnswer: "All IT projects above a defined threshold follow our formal PM methodology. Projects have defined governance with a steering committee, PM, and formal phase gates. Project status is reported monthly to the IT Steering Committee. Significant cost or scope changes require re-approval.",
      supportingEvidence: ["IT PM Methodology", "Project charters", "Steering committee minutes", "Monthly portfolio reports", "Project closure reports"],
    },
    {
      id: "aq-3410-2",
      question: "How are project risks identified and managed, and how are critical risks escalated?",
      whySamaMayAsk: "SAMA wants evidence that IT project risks are actively managed, particularly for projects with regulatory implications.",
      expectedAnswer: "All projects maintain a RAID log. Critical risks are escalated to the IT Steering Committee. For regulatory projects, risks are also reported to the compliance function. Risk owners are assigned and mitigation actions tracked to closure.",
      supportingEvidence: ["RAID logs", "Steering committee risk escalations", "Risk mitigation evidence"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-3410-1",
      name: "IT Project Management Methodology",
      description: "Documented PM methodology with phases, gates, templates, and governance structure.",
      type: "Policy",
      owner: "PMO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-3410",
      domain: "System Change Management",
    },
    {
      id: "ev-3410-2",
      name: "Monthly IT Project Portfolio Report",
      description: "Regular portfolio status reports showing all active IT projects with status, budget, risks, and milestones.",
      type: "Report",
      owner: "PMO",
      updateFrequency: "Monthly",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-3410",
      domain: "System Change Management",
    },
    {
      id: "ev-3410-3",
      name: "Project Governance Records",
      description: "Project charters, steering committee minutes, and phase gate approvals.",
      type: "Document",
      owner: "PMO",
      updateFrequency: "Per project",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-3410",
      domain: "System Change Management",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "IT projects are managed informally. No standard methodology. Success depends on individual project managers.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define PM methodology", "Establish portfolio visibility"] },
    { level: 2, label: "Developing", description: "Basic project management in place for major projects. Methodology is inconsistent.", documentationExpected: ["Draft PM guidelines"], operatingEvidenceExpected: ["Some project reports"], gapsToClose: ["Standardise methodology", "Implement portfolio reporting"] },
    { level: 3, label: "Defined", description: "Formal PM methodology adopted. Portfolio reporting to IT Steering Committee. Risks actively managed. SAMA expects at least this level.", documentationExpected: ["PM Methodology", "Templates"], operatingEvidenceExpected: ["Portfolio reports", "Governance records", "Risk logs"], gapsToClose: ["Benefits realisation tracking", "Post-project reviews"] },
    { level: 4, label: "Managed", description: "Portfolio performance metrics tracked. Benefits realisation measured. Post-project reviews conducted.", documentationExpected: ["All Level 3 docs", "Benefits plans"], operatingEvidenceExpected: ["Benefits evidence", "PIR reports"], gapsToClose: ["Agile/DevOps integration"] },
    { level: 5, label: "Optimised", description: "Adaptive portfolio management with continuous prioritisation and real-time delivery metrics.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Real-time dashboards"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-3410-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Assess current project management practices and governance gaps", owner: "PMO", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-3410-2", phase: 2, phaseLabel: "Design", timeline: "Month 2–3", activity: "Define IT PM methodology, templates, and governance structure", owner: "PMO", dependency: "Assessment", deliverable: "PM Methodology", evidenceProduced: "Methodology document and templates" },
    { id: "rm-3410-3", phase: 3, phaseLabel: "Implement", timeline: "Month 3–5", activity: "Implement portfolio reporting and establish IT Steering Committee cadence", owner: "PMO", dependency: "Methodology approved", deliverable: "Portfolio reporting live", evidenceProduced: "Monthly portfolio reports" },
  ],

  commonGaps: [
    "No formal IT PM methodology — each project is managed differently based on the individual project manager",
    "No consolidated IT project portfolio view — senior management lacks visibility of all active initiatives",
    "Project risks are not formally tracked — risks are discussed in status meetings but not recorded in RAID logs",
    "Projects are initiated without formal business cases or approvals — scope creep is common",
    "No post-project reviews — the bank does not learn from delivery experience or measure benefits realisation",
  ],
  relatedControls: ["3.4.1", "3.4.2", "3.1.2", "3.1.3"],
};
