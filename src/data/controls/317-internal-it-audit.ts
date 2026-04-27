import type { Control } from "@/types";

export const control317: Control = {
  id: "ctrl-317",
  controlNumber: "3.1.7",
  title: "Internal IT Audit",
  domain: "Information Technology Governance and Leadership",
  domainId: "dom-31",
  subdomain: "IT Governance and Leadership",
  subdomainId: "sub-311",
  priority: "P1",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "Internal Audit Head",
  supportingStakeholders: ["CIO", "CTO", "CISO", "Compliance Officer", "Board Audit Committee"],

  plainEnglishInterpretation:
    "The bank must have an independent internal IT audit function that regularly assesses whether IT controls, processes, and systems are operating effectively and in compliance with SAMA requirements. IT audit findings must be reported to senior management and the Board, and findings must be tracked to remediation.",
  samaIntent:
    "SAMA requires banks to maintain independent IT audit capability as a third line of defence. IT audit provides assurance to the Board and SAMA that IT controls are working. SAMA will look for evidence that IT audit is genuinely independent, has adequate capability, produces meaningful findings, and that management acts on those findings.",
  whyItMatters:
    "Internal IT audit provides independent verification that the bank's IT controls are functioning. Without effective IT audit, weaknesses in IT governance, security, and operations may go undetected until they cause an incident or are identified by SAMA during an inspection. IT audit is a critical governance safeguard for the Board.",
  riskIfNotImplemented:
    "Undetected IT control failures, SAMA inspection findings for lack of independent IT assurance, Board unable to discharge technology oversight responsibilities, regulatory sanctions for inadequate three-lines-of-defence model in IT.",

  requiredCapabilities: [
    {
      id: "cap-317-1",
      name: "IT Audit Function",
      description: "Dedicated IT audit capability within Internal Audit with qualified IT auditors and an annual IT audit plan.",
      owner: "Internal Audit Head",
      relatedTools: ["TeamMate", "Auditboard", "ACL/Galvanize", "IDEA"],
      targetMaturity: 3,
      dependencies: ["Board Audit Committee oversight", "Internal Audit Charter"],
    },
    {
      id: "cap-317-2",
      name: "Risk-Based IT Audit Plan",
      description: "Annual IT audit plan that prioritises audits based on IT risk exposure, covering all key IT domains over a defined cycle.",
      owner: "Internal Audit Head",
      relatedTools: ["Audit management system", "Risk register"],
      targetMaturity: 3,
      dependencies: ["IT risk register", "IT audit capability"],
    },
    {
      id: "cap-317-3",
      name: "Audit Finding Tracking",
      description: "Formal process for tracking IT audit findings through to remediation, with escalation for overdue or high-risk findings.",
      owner: "Internal Audit Head",
      relatedTools: ["Audit management system", "ServiceNow"],
      targetMaturity: 3,
      dependencies: ["IT audit function", "Management accountability"],
    },
  ],

  actions: [
    {
      id: "act-317-p1",
      category: "People",
      title: "Build IT Audit Capability",
      description: "Recruit or upskill internal auditors with IT audit competencies (CISA or equivalent) to cover technology risk domains.",
      owner: "Internal Audit Head",
      stakeholders: ["CHRO", "Board Audit Committee"],
      priority: "P1",
      effort: "3 months",
      dependency: "Board approval for headcount",
      evidenceProduced: "IT auditor CVs, certifications, training records",
    },
    {
      id: "act-317-pr1",
      category: "Process",
      title: "Develop Annual IT Audit Plan",
      description: "Develop a risk-based annual IT audit plan covering all key IT domains. Present to and approve by the Board Audit Committee.",
      owner: "Internal Audit Head",
      stakeholders: ["Board Audit Committee", "CIO"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "IT risk assessment",
      evidenceProduced: "Approved annual IT audit plan",
    },
  ],

  raciMatrix: [
    {
      activity: "Plan and execute IT audit activities",
      boardTechnologyCommittee: "A",
      cio: "C",
      cto: "C",
      itGovernanceHead: "C",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "I",
      itOperationsHead: "C",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "C",
      internalAudit: "R",
      pmo: "I",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-317-1",
      question: "How does the bank ensure its IT controls are independently audited, and how are findings reported and tracked?",
      whySamaMayAsk: "SAMA wants to verify the bank has genuine independent IT audit capability and that findings are acted upon.",
      expectedAnswer: "We have a dedicated IT audit team with qualified IT auditors (CISA certified). The annual IT audit plan is risk-based and approved by the Board Audit Committee. All findings are tracked in our audit management system and reported quarterly to the Board Audit Committee. Overdue findings are escalated.",
      supportingEvidence: ["IT audit team CVs and certifications", "Annual IT audit plan", "Audit reports", "Finding tracking dashboard", "Board Audit Committee minutes"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-317-1",
      name: "Annual IT Audit Plan",
      description: "Risk-based annual audit plan covering all key IT domains, approved by Board Audit Committee.",
      type: "Document",
      owner: "Internal Audit Head",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-317",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-317-2",
      name: "IT Audit Reports",
      description: "Completed IT audit reports with findings, ratings, and management responses.",
      type: "Report",
      owner: "Internal Audit Head",
      updateFrequency: "Per audit",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-317",
      domain: "Information Technology Governance and Leadership",
    },
    {
      id: "ev-317-3",
      name: "Audit Finding Tracker",
      description: "Live tracker of all open IT audit findings with target dates and remediation status.",
      type: "Document",
      owner: "Internal Audit Head",
      updateFrequency: "Monthly",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-317",
      domain: "Information Technology Governance and Leadership",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No dedicated IT audit capability. IT is audited generically as part of overall audit without specialist skills.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Build IT audit capability", "Develop IT audit plan"] },
    { level: 2, label: "Developing", description: "Some IT audits conducted but coverage is limited and findings tracking is informal.", documentationExpected: ["Draft audit plan"], operatingEvidenceExpected: ["Some audit reports"], gapsToClose: ["Formalise finding tracking", "Achieve full IT domain coverage"] },
    { level: 3, label: "Defined", description: "Risk-based IT audit plan approved by Board. Qualified IT auditors. Findings tracked. SAMA expects at least this level.", documentationExpected: ["Annual audit plan", "Audit reports", "Finding tracker"], operatingEvidenceExpected: ["Board Audit Committee minutes", "Completed audits", "Remediation evidence"], gapsToClose: ["Continuous monitoring integration", "Data analytics in audit"] },
    { level: 4, label: "Managed", description: "IT audit uses continuous monitoring and data analytics. Audit findings integrated with risk management.", documentationExpected: ["All Level 3 docs", "Data analytics evidence"], operatingEvidenceExpected: ["Continuous monitoring reports"], gapsToClose: ["AI-assisted risk-based audit selection"] },
    { level: 5, label: "Optimised", description: "Continuous audit capability with real-time assurance dashboards and predictive risk identification.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Real-time dashboards"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-317-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Assess current IT audit capability and coverage gaps", owner: "Internal Audit Head", dependency: "None", deliverable: "Capability assessment", evidenceProduced: "Assessment report" },
    { id: "rm-317-2", phase: 2, phaseLabel: "Build", timeline: "Month 2–4", activity: "Recruit/train IT auditors and develop annual audit plan", owner: "Internal Audit Head", dependency: "Assessment", deliverable: "IT audit team and plan", evidenceProduced: "CVs, certifications, audit plan" },
  ],

  commonGaps: [
    "No dedicated IT audit resources — IT audits are conducted by general auditors without technology expertise",
    "IT audit plan is not risk-based — audits are rotational rather than driven by risk exposure",
    "Audit findings are reported but not formally tracked to closure",
    "IT audit scope does not cover all SAMA ITGF domains, leaving significant areas unaudited",
    "Internal IT audit is not sufficiently independent — the audit function reports to the CIO or CTO rather than to the Board Audit Committee",
  ],
  relatedControls: ["3.1.1", "3.1.6", "3.2.1"],
};
