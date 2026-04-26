import type { Control } from "@/types";

export const control321: Control = {
  id: "ctrl-321",
  controlNumber: "3.2.1",
  title: "Managing IT Risks",
  domain: "IT Risk Management",
  domainId: "dom-32",
  subdomain: "IT Risk Management Framework",
  subdomainId: "sub-321",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Risk Manager",
  supportingStakeholders: ["CIO", "CISO", "Enterprise Architect", "IT Governance Head", "Internal Audit", "Compliance Officer"],

  plainEnglishInterpretation:
    "The bank must have a formal IT risk management framework that defines how IT risks are identified, assessed, treated, monitored, and reported. The framework must be aligned to the bank's enterprise risk management approach and must be actively operated – not just documented.",
  samaIntent:
    "SAMA wants to see that IT risk management is embedded in the bank's operations, not a paper exercise. IT risks must be visible to the Board, actively managed by IT, and integrated with the bank's overall risk posture.",
  whyItMatters:
    "IT risks – including cyber threats, system failures, data loss, and third-party failures – are among the most material risks facing Saudi banks. Without a structured IT risk management framework, these risks may go undetected until they cause significant harm to the bank, its customers, and the financial system.",
  riskIfNotImplemented:
    "Unmanaged technology risks leading to outages, breaches, regulatory censure, customer harm, financial loss, and SAMA enforcement actions.",

  requiredCapabilities: [
    { id: "cap-321-1", name: "IT Risk Management Framework Document", description: "A formal framework document defining IT risk management methodology, risk appetite, governance, and integration with enterprise risk.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "SharePoint"], targetMaturity: 3, dependencies: ["Enterprise risk framework", "IT governance charter"] },
    { id: "cap-321-2", name: "IT Risk Committee", description: "A governance body that reviews IT risks, approves risk treatments, monitors risk posture, and escalates material risks to the Board.", owner: "CIO", relatedTools: ["Board portal", "GRC tool"], targetMaturity: 4, dependencies: ["IT risk framework", "Governance committee structures"] },
    { id: "cap-321-3", name: "IT Risk Appetite Statement", description: "A formal statement defining the bank's tolerance for IT risks across key categories including availability, security, data, and vendor risk.", owner: "CIO", relatedTools: ["GRC tool"], targetMaturity: 4, dependencies: ["Enterprise risk appetite", "IT risk framework"] },
  ],

  actions: [
    { id: "act-321-p1", category: "People", title: "Establish IT Risk Team", description: "Build a dedicated IT risk function with the skills to identify, assess, and manage all categories of IT risk.", owner: "CIO", stakeholders: ["CHRO", "IT Risk Manager"], priority: "P1", effort: "1 month", dependency: "Org structure approved", evidenceProduced: "IT risk team structure, job descriptions" },
    { id: "act-321-pr1", category: "Process", title: "Develop IT Risk Management Framework", description: "Create a comprehensive IT risk framework document covering methodology, risk categories, appetite, governance, and integration with enterprise risk management.", owner: "IT Risk Manager", stakeholders: ["CIO", "Enterprise Architect", "Internal Audit"], priority: "P1", effort: "8 weeks", dependency: "Enterprise risk framework", evidenceProduced: "IT Risk Management Framework document" },
    { id: "act-321-pr2", category: "Process", title: "Define IT Risk Appetite Statements", description: "Work with the Board and Risk Committee to define quantified risk appetite statements for each material IT risk category.", owner: "IT Risk Manager", stakeholders: ["CIO", "CRO", "Board Risk Committee"], priority: "P1", effort: "4 weeks", dependency: "IT risk framework", evidenceProduced: "Board-approved IT risk appetite statement" },
    { id: "act-321-t1", category: "Technology", title: "Implement IT Risk Module in GRC Tool", description: "Configure a GRC platform to support IT risk identification, scoring, treatment tracking, and reporting.", owner: "IT Risk Manager", stakeholders: ["IT Governance Head", "IT Operations Head"], priority: "P2", effort: "3 months", dependency: "IT risk framework defined", evidenceProduced: "GRC tool configuration, risk register" },
    { id: "act-321-t2", category: "Technology", title: "Deploy IT Risk Dashboard", description: "Create an IT risk dashboard for the CIO and Board Technology Committee showing current risk posture, top risks, and treatment progress.", owner: "IT Risk Manager", stakeholders: ["CIO", "IT Governance Head"], priority: "P2", effort: "6 weeks", dependency: "GRC tool implemented", evidenceProduced: "Dashboard screenshots, committee reports" },
  ],

  raciMatrix: [
    { activity: "Develop and maintain IT risk framework", boardTechnologyCommittee: "A", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "I", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "C", pmo: "I", vendorManager: "I" },
    { activity: "Maintain IT risk register", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "C", pmo: "I", vendorManager: "C" },
    { activity: "Report IT risk posture to Board", boardTechnologyCommittee: "A", cio: "R", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "C", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-321-1", question: "Can you describe your IT risk management framework and how it operates?", whySamaMayAsk: "SAMA needs to verify that IT risk management is structured and actively operated.", expectedAnswer: "We have a Board-approved IT risk management framework. IT risks are identified and assessed quarterly, tracked in our GRC tool, and reported to the IT Risk Committee monthly. Material risks are escalated to the Board Technology Committee.", supportingEvidence: ["IT risk framework document", "IT risk register", "Risk committee minutes"] },
    { id: "aq-321-2", question: "What is your bank's IT risk appetite and how is it applied?", whySamaMayAsk: "SAMA tests whether risk appetite is actually used to drive decisions.", expectedAnswer: "We have Board-approved risk appetite statements for each IT risk category. When a risk score exceeds our appetite threshold, it automatically triggers escalation and requires CIO approval for any exception.", supportingEvidence: ["IT risk appetite statement", "Board approval minutes", "GRC tool escalation records"] },
    { id: "aq-321-3", question: "How do you ensure emerging IT risks are identified and captured?", whySamaMayAsk: "SAMA checks whether the risk process is forward-looking or only capturing known historical risks.", expectedAnswer: "We conduct quarterly horizon scanning workshops, subscribe to threat intelligence feeds, and require all IT project teams to perform risk assessments at initiation. New risks are added to the register within 5 business days of identification.", supportingEvidence: ["Horizon scanning records", "Threat intelligence subscriptions", "Project risk assessments"] },
  ],

  evidenceChecklist: [
    { id: "ev-321-1", name: "IT Risk Management Framework", description: "Board-approved framework document defining IT risk methodology, categories, appetite, and governance.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-321", domain: "IT Risk Management" },
    { id: "ev-321-2", name: "IT Risk Appetite Statement", description: "Board-approved statement defining the bank's tolerance for each category of IT risk.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-321", domain: "IT Risk Management" },
    { id: "ev-321-3", name: "IT Risk Committee Terms of Reference", description: "Committee charter for the IT Risk Committee including membership, frequency, and scope.", type: "Document", owner: "CIO", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-321", domain: "IT Risk Management" },
    { id: "ev-321-4", name: "IT Risk Dashboard", description: "Current IT risk posture dashboard showing top risks, treatment status, and trends.", type: "Report", owner: "IT Risk Manager", updateFrequency: "Monthly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-321", domain: "IT Risk Management" },
    { id: "ev-321-5", name: "Board IT Risk Reporting Records", description: "Records of IT risk reports presented to the Board Technology Committee.", type: "Report", owner: "IT Risk Manager", updateFrequency: "Quarterly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-321", domain: "IT Risk Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "IT risks are managed informally. No risk register or framework. Risk decisions made by individual judgement.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define IT risk categories", "Create basic risk register", "Assign IT risk owner"] },
    { level: 2, label: "Developing", description: "IT risk register exists but is incomplete and not regularly updated. Limited Board visibility.", documentationExpected: ["Draft IT risk register"], operatingEvidenceExpected: [], gapsToClose: ["Formalise framework", "Define risk appetite", "Establish governance body"] },
    { level: 3, label: "Defined", description: "Formal IT risk framework exists. Risk register is maintained. IT Risk Committee meets regularly. Board reporting in place.", documentationExpected: ["IT risk framework", "Risk register", "Committee ToR"], operatingEvidenceExpected: ["Committee minutes", "Board reports"], gapsToClose: ["Automate risk scoring", "Implement GRC tool", "Define appetite thresholds"] },
    { level: 4, label: "Managed", description: "IT risk is managed quantitatively using a GRC tool. Appetite thresholds trigger automated escalation. Board reporting is data-driven. SAMA would accept this.", documentationExpected: ["All L3 + risk appetite", "GRC configuration"], operatingEvidenceExpected: ["GRC dashboards", "Escalation records", "Board minutes"], gapsToClose: ["Introduce predictive risk analytics"] },
    { level: 5, label: "Optimised", description: "IT risk management is predictive and continuously improving based on data analytics, threat intelligence, and control effectiveness feedback.", documentationExpected: ["All L4 + benchmarking"], operatingEvidenceExpected: ["Predictive risk models", "Threat intel integration"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-321-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Assess current IT risk management maturity", owner: "IT Risk Manager", dependency: "None", deliverable: "Maturity gap report", evidenceProduced: "Gap report" },
    { id: "rm-321-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–3", activity: "Develop IT risk management framework", owner: "IT Risk Manager", dependency: "Gap report", deliverable: "IT risk framework document", evidenceProduced: "Framework document" },
    { id: "rm-321-3", phase: 2, phaseLabel: "Design", timeline: "Month 2–3", activity: "Define IT risk appetite statements", owner: "IT Risk Manager", dependency: "Framework draft", deliverable: "IT risk appetite statement", evidenceProduced: "Board-approved appetite statement" },
    { id: "rm-321-4", phase: 3, phaseLabel: "Implement", timeline: "Month 3–6", activity: "Implement GRC tool for IT risk management", owner: "IT Governance Head", dependency: "Framework approved", deliverable: "Configured GRC tool", evidenceProduced: "GRC screenshots, risk register" },
    { id: "rm-321-5", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 6+", activity: "Operate IT risk committees and Board reporting", owner: "IT Risk Manager", dependency: "GRC tool live", deliverable: "Monthly/quarterly reports", evidenceProduced: "Committee minutes, Board reports" },
  ],

  commonGaps: [
    "IT risk register is maintained in Excel by one person – not visible to governance bodies",
    "Risk appetite is defined for financial and credit risk but not for IT-specific risk categories",
    "IT risks are assessed qualitatively only – no consistent scoring methodology",
    "IT risks are not formally reported to the Board – only to the IT Steering Committee",
    "Risk treatment plans lack assigned owners and target dates",
  ],
  relatedControls: ["3.2.2", "3.2.3", "3.2.4", "3.1.1", "3.1.6"],
};
