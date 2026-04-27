import type { Control } from "@/types";

export const control343: Control = {
  id: "ctrl-343",
  controlNumber: "3.4.3",
  title: "System Acquisition",
  domain: "System Change Management",
  domainId: "dom-34",
  subdomain: "System Change Management",
  subdomainId: "sub-341",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "CTO",
  supportingStakeholders: ["CIO", "Enterprise Architect", "CISO", "Vendor Manager", "Legal", "Compliance Officer", "PMO"],

  plainEnglishInterpretation:
    "When the bank acquires software or technology systems from third-party vendors, the acquisition process must include proper due diligence — evaluating the vendor's security posture, contractual protections, compliance with SAMA requirements, and ensuring the acquired system meets the bank's architecture and security standards before deployment.",
  samaIntent:
    "SAMA requires that banks apply rigour to technology acquisition decisions. Acquiring systems with inadequate security controls, unvetted vendors, or without proper contractual protections creates systemic risk. SAMA wants evidence that IT procurement decisions are governed, security requirements are specified upfront, and vendor due diligence is performed.",
  whyItMatters:
    "Technology acquisitions lock in vendors and create long-term security and operational dependencies. A system acquired without proper security assessment can introduce vulnerabilities that are expensive or impossible to remediate after deployment. For Saudi banks, SAMA data localisation and security requirements must also be assessed during acquisition.",
  riskIfNotImplemented:
    "Acquisition of systems with inadequate security controls, vendor lock-in without appropriate contractual protections, non-compliance with SAMA data localisation requirements, introduction of systems that cannot be adequately audited or controlled.",

  requiredCapabilities: [
    {
      id: "cap-343-1",
      name: "IT Procurement Governance",
      description: "Formal governance process for evaluating, selecting, and approving technology acquisitions against technical, security, and compliance criteria.",
      owner: "CTO",
      relatedTools: ["Procurement system", "Risk assessment templates"],
      targetMaturity: 3,
      dependencies: ["IT Strategy", "Architecture Review Board"],
    },
    {
      id: "cap-343-2",
      name: "Security Requirements for Acquired Systems",
      description: "Standard set of security requirements that all acquired systems must meet, evaluated during procurement and included in contracts.",
      owner: "CISO",
      relatedTools: ["Security assessment templates", "Contract management system"],
      targetMaturity: 3,
      dependencies: ["Security policy", "SAMA cybersecurity framework requirements"],
    },
    {
      id: "cap-343-3",
      name: "Vendor Due Diligence Process",
      description: "Process for assessing vendor security posture, financial stability, regulatory compliance, and support capability before acquisition.",
      owner: "Vendor Manager",
      relatedTools: ["Vendor risk assessment tools", "Third-party risk platforms"],
      targetMaturity: 3,
      dependencies: ["Third-party risk management framework"],
    },
  ],

  actions: [
    {
      id: "act-343-pr1",
      category: "Process",
      title: "Define System Acquisition Policy",
      description: "Establish a formal IT system acquisition policy covering governance, evaluation criteria, security requirements, and approval authorities.",
      owner: "CTO",
      stakeholders: ["CIO", "CISO", "Legal", "Procurement"],
      priority: "P1",
      effort: "6 weeks",
      dependency: "None",
      evidenceProduced: "System Acquisition Policy",
    },
    {
      id: "act-343-pr2",
      category: "Process",
      title: "Develop Security Assessment Template for Acquisitions",
      description: "Create a standard security assessment template used for all technology acquisitions, covering SAMA requirements, data handling, integration security, and audit rights.",
      owner: "CISO",
      stakeholders: ["CTO", "Vendor Manager"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "Acquisition policy defined",
      evidenceProduced: "Security assessment template",
    },
  ],

  raciMatrix: [
    {
      activity: "Evaluate and approve technology acquisitions",
      boardTechnologyCommittee: "A",
      cio: "R",
      cto: "R",
      itGovernanceHead: "C",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "C",
      itOperationsHead: "C",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "C",
      internalAudit: "I",
      pmo: "C",
      vendorManager: "R",
    },
  ],

  auditQuestions: [
    {
      id: "aq-343-1",
      question: "How does the bank ensure that IT systems acquired from third parties meet security, compliance, and architectural requirements?",
      whySamaMayAsk: "SAMA wants evidence that technology acquisitions are not made without appropriate due diligence and security assessment.",
      expectedAnswer: "All technology acquisitions go through a formal evaluation process that includes security assessment against our standard requirements, architecture review, vendor due diligence, and compliance check for SAMA requirements including data localisation. These assessments are documented and must be approved before procurement proceeds.",
      supportingEvidence: ["System Acquisition Policy", "Security assessment reports for acquired systems", "Vendor due diligence records", "Architecture review approvals"],
    },
    {
      id: "aq-343-2",
      question: "How does the bank ensure SAMA's data localisation requirements are considered in system acquisition decisions?",
      whySamaMayAsk: "SAMA has specific requirements about where banking data is stored and processed. Acquisitions of cloud or SaaS solutions must comply.",
      expectedAnswer: "Our acquisition checklist includes an explicit check for SAMA data localisation compliance. Any system that stores or processes banking data must be hosted in KSA or in approved jurisdictions, and this is evaluated as a mandatory criterion during procurement.",
      supportingEvidence: ["Acquisition checklist showing data localisation criteria", "Evidence of localisation assessment for recent acquisitions"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-343-1",
      name: "System Acquisition Policy",
      description: "Policy governing how technology systems are evaluated, selected, and approved.",
      type: "Policy",
      owner: "CTO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-343",
      domain: "System Change Management",
    },
    {
      id: "ev-343-2",
      name: "Security Assessment Reports for Acquired Systems",
      description: "Completed security assessments for systems acquired from third parties.",
      type: "Report",
      owner: "CISO",
      updateFrequency: "Per acquisition",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-343",
      domain: "System Change Management",
    },
    {
      id: "ev-343-3",
      name: "Vendor Due Diligence Records",
      description: "Due diligence assessments completed on technology vendors before contract execution.",
      type: "Document",
      owner: "Vendor Manager",
      updateFrequency: "Per acquisition",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-343",
      domain: "System Change Management",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "System acquisition is informal. Technology is procured based on features and price without security or compliance assessment.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define acquisition policy", "Create security requirements checklist"] },
    { level: 2, label: "Developing", description: "Some security considerations in procurement but process is inconsistent.", documentationExpected: ["Draft acquisition requirements"], operatingEvidenceExpected: ["Some vendor security checks"], gapsToClose: ["Formalise process", "Mandatory security assessment for all acquisitions"] },
    { level: 3, label: "Defined", description: "Formal acquisition policy. Mandatory security assessment and vendor due diligence for all acquisitions. SAMA expects at least this level.", documentationExpected: ["Acquisition Policy", "Security assessment template", "Due diligence checklist"], operatingEvidenceExpected: ["Assessment reports", "Due diligence records", "Architecture review approvals"], gapsToClose: ["Automate vendor risk scoring", "Post-acquisition review process"] },
    { level: 4, label: "Managed", description: "Acquisition process includes continuous vendor monitoring post-acquisition. Metrics tracked.", documentationExpected: ["All Level 3 docs", "Post-acquisition review process"], operatingEvidenceExpected: ["Continuous monitoring evidence"], gapsToClose: ["Predictive vendor risk scoring"] },
    { level: 5, label: "Optimised", description: "Real-time vendor risk intelligence integrated into acquisition and ongoing management.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Automated vendor dashboards"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-343-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Review current acquisition process and identify gaps", owner: "CTO", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-343-2", phase: 2, phaseLabel: "Design", timeline: "Month 2–3", activity: "Develop system acquisition policy and security assessment templates", owner: "CISO", dependency: "Assessment", deliverable: "Acquisition Policy and templates", evidenceProduced: "Policy documents" },
    { id: "rm-343-3", phase: 3, phaseLabel: "Implement", timeline: "Month 3–4", activity: "Train procurement and IT staff on new acquisition requirements", owner: "CTO", dependency: "Policy approved", deliverable: "Trained staff", evidenceProduced: "Training records" },
  ],

  commonGaps: [
    "Technology is procured based on features and cost without formal security assessment",
    "Vendor due diligence is superficial — no assessment of vendor security posture or regulatory compliance",
    "SAMA data localisation requirements are not checked during acquisition of cloud/SaaS solutions",
    "Security requirements are not included in contracts — no right to audit, no security SLAs",
    "Architecture review is bypassed for smaller acquisitions, creating integration and technical debt issues",
  ],
  relatedControls: ["3.4.1", "3.4.4", "3.4.5", "3.4.6"],
};
