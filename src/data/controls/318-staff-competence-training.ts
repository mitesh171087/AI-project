import type { Control } from "@/types";

export const control318: Control = {
  id: "ctrl-318",
  controlNumber: "3.1.8",
  title: "Staff Competence and Training",
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
  supportingStakeholders: ["CHRO", "CTO", "CISO", "IT Governance Head", "All IT Heads"],

  plainEnglishInterpretation:
    "The bank must ensure its IT staff have the skills and knowledge required to perform their roles effectively and to meet SAMA compliance requirements. This includes maintaining role-based competency profiles, assessing staff against those profiles, providing training to close gaps, and ensuring IT staff are aware of their regulatory and security responsibilities.",
  samaIntent:
    "SAMA recognises that technology risk is ultimately managed by people. IT staff who lack the right skills create operational risk. SAMA expects banks to systematically manage IT staff competency — not just through generic training programs, but through targeted, role-specific development plans aligned to the bank's technology and risk profile.",
  whyItMatters:
    "Technology is only as secure and well-managed as the people operating it. Gaps in staff competency lead to misconfigurations, poor security practices, inadequate risk assessment, and inability to respond to incidents effectively. Investing in IT staff capability is one of the most impactful risk mitigations available to a bank.",
  riskIfNotImplemented:
    "IT operational errors from unqualified staff, security incidents caused by lack of security awareness, regulatory non-compliance due to staff not understanding SAMA requirements, inability to attract and retain skilled IT staff.",

  requiredCapabilities: [
    {
      id: "cap-318-1",
      name: "IT Competency Framework",
      description: "Defined competency profiles for all IT roles specifying the skills, knowledge, and certifications required.",
      owner: "CIO",
      relatedTools: ["HR system", "Skills management platform"],
      targetMaturity: 3,
      dependencies: ["IT organisational structure", "Job descriptions"],
    },
    {
      id: "cap-318-2",
      name: "Training Needs Assessment",
      description: "Annual assessment of IT staff competency gaps against role profiles, used to develop targeted training plans.",
      owner: "CIO",
      relatedTools: ["LMS", "Performance management system"],
      targetMaturity: 3,
      dependencies: ["Competency framework", "Staff performance process"],
    },
    {
      id: "cap-318-3",
      name: "IT Training Programme",
      description: "Structured training programme addressing identified IT competency gaps including technical training, regulatory/compliance training, and security awareness.",
      owner: "CIO",
      relatedTools: ["LMS", "External training providers", "Vendor certifications"],
      targetMaturity: 3,
      dependencies: ["Training needs assessment", "Budget allocation"],
    },
  ],

  actions: [
    {
      id: "act-318-p1",
      category: "People",
      title: "Develop IT Competency Framework",
      description: "Define competency profiles for all IT roles aligned to the bank's technology strategy and SAMA compliance requirements.",
      owner: "CIO",
      stakeholders: ["CHRO", "IT Heads"],
      priority: "P1",
      effort: "8 weeks",
      dependency: "IT org structure confirmed",
      evidenceProduced: "IT Competency Framework",
    },
    {
      id: "act-318-pr1",
      category: "Process",
      title: "Implement Annual Training Needs Assessment",
      description: "Conduct annual assessment of IT staff competency gaps and produce development plans, integrated with the HR performance cycle.",
      owner: "CIO",
      stakeholders: ["CHRO", "IT Managers"],
      priority: "P1",
      effort: "4 weeks (annually)",
      dependency: "Competency framework defined",
      evidenceProduced: "Training needs assessment results, individual development plans",
    },
  ],

  raciMatrix: [
    {
      activity: "Manage IT staff competency and training",
      boardTechnologyCommittee: "I",
      cio: "A",
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
      pmo: "I",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-318-1",
      question: "How does the bank ensure its IT staff have the competencies required to manage the bank's technology and meet SAMA requirements?",
      whySamaMayAsk: "SAMA wants evidence that IT staff competency is systematically managed, not left to chance.",
      expectedAnswer: "We have an IT competency framework defining skill requirements for each role. Annual training needs assessments identify gaps, and targeted training plans are developed. Completion of mandatory training (including regulatory and security awareness) is tracked and reported to management.",
      supportingEvidence: ["IT Competency Framework", "Training needs assessment results", "Training completion records", "Individual development plans"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-318-1",
      name: "IT Competency Framework",
      description: "Documented competency profiles for all IT roles.",
      type: "Document",
      owner: "CIO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-318",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-318-2",
      name: "Annual Training Needs Assessment",
      description: "Results of annual assessment of IT staff competency gaps.",
      type: "Document",
      owner: "CIO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-318",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-318-3",
      name: "Training Completion Records",
      description: "Records of IT staff training completion including mandatory and technical training.",
      type: "Document",
      owner: "CIO",
      updateFrequency: "Continuous",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-318",
      domain: "Information Technology Governance and Leadership",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No formal IT competency framework. Training is ad hoc.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define IT competency profiles", "Implement mandatory training"] },
    { level: 2, label: "Developing", description: "Some training provided but not targeted to competency gaps. No formal framework.", documentationExpected: ["Some training records"], operatingEvidenceExpected: ["Training attendance"], gapsToClose: ["Develop competency framework", "Implement training needs assessment"] },
    { level: 3, label: "Defined", description: "IT competency framework in place. Annual TNA conducted. Targeted training provided. SAMA expects at least this level.", documentationExpected: ["Competency Framework", "TNA results", "Training plan"], operatingEvidenceExpected: ["Training records", "Development plans"], gapsToClose: ["Integrate with succession planning", "Implement skills benchmarking"] },
    { level: 4, label: "Managed", description: "Training effectiveness measured. Skills benchmarked against industry. Succession plans for key IT roles.", documentationExpected: ["All Level 3 docs", "Training effectiveness evidence"], operatingEvidenceExpected: ["Competency improvement metrics"], gapsToClose: ["Predictive skills gap analysis"] },
    { level: 5, label: "Optimised", description: "Continuous learning culture with personalised development paths and real-time competency tracking.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Continuous learning metrics"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-318-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1–2", activity: "Assess current IT competency levels and training coverage", owner: "CIO", dependency: "None", deliverable: "Competency gap analysis", evidenceProduced: "Assessment report" },
    { id: "rm-318-2", phase: 2, phaseLabel: "Design", timeline: "Month 2–4", activity: "Develop IT competency framework and training programme", owner: "CIO", dependency: "Assessment", deliverable: "Competency Framework and Training Plan", evidenceProduced: "Framework document" },
    { id: "rm-318-3", phase: 3, phaseLabel: "Implement", timeline: "Month 4+", activity: "Implement training and track completion", owner: "CIO", dependency: "Framework approved", deliverable: "Training completion", evidenceProduced: "Training records" },
  ],

  commonGaps: [
    "No formal IT competency framework — skill requirements are not defined per role",
    "Training is available but not targeted to actual competency gaps",
    "Mandatory regulatory and security awareness training is not completed by all IT staff",
    "Training completion is not tracked or reported to management",
    "Key IT roles have no succession planning — single points of failure in critical knowledge areas",
  ],
  relatedControls: ["3.1.5", "3.1.9", "3.1.1"],
};
