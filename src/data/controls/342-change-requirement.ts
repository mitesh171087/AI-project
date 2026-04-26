import type { Control } from "@/types";

export const control342: Control = {
  id: "ctrl-342",
  controlNumber: "3.4.2",
  title: "Change Requirement Definition and Approval",
  domain: "IT Project & Change Management",
  domainId: "dom-34",
  subdomain: "IT Change Management",
  subdomainId: "sub-341",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "Not Started",
  evidenceReadiness: "Missing",
  primaryOwner: "IT Governance Head",
  supportingStakeholders: ["CTO", "Enterprise Architect", "Application Owner", "PMO", "Business Analysis Team"],

  plainEnglishInterpretation:
    "Before any IT change is implemented, its requirements must be formally defined, documented, and approved by the appropriate stakeholders. This includes business requirements, functional requirements, technical requirements, security requirements, and impact assessments. Incomplete requirements are a primary cause of change failures.",
  samaIntent:
    "SAMA expects that IT changes are well-defined before implementation begins. Banks that implement poorly defined changes frequently experience outages, security incidents, and compliance failures. Requirement completeness is a leading indicator of change management maturity.",
  whyItMatters:
    "Ambiguous or incomplete requirements lead to changes that fail testing, miss business needs, or create security vulnerabilities. Formal requirement definition and approval creates accountability, reduces rework, and ensures changes deliver their intended purpose.",
  riskIfNotImplemented:
    "Failed changes, post-implementation rework, security vulnerabilities from incomplete security requirements, SAMA findings of weak change control, and financial loss from failed IT projects.",

  requiredCapabilities: [
    { id: "cap-342-1", name: "Change Requirement Template", description: "A standardised template capturing all required dimensions: business, functional, technical, security, and compliance requirements.", owner: "IT Governance Head", relatedTools: ["Confluence", "SharePoint", "JIRA"], targetMaturity: 3, dependencies: ["Change management policy"] },
    { id: "cap-342-2", name: "Requirement Approval Process", description: "A defined approval process ensuring that requirements are reviewed and signed off by business owner, IT, security, and compliance before design begins.", owner: "IT Governance Head", relatedTools: ["JIRA", "ServiceNow", "Confluence"], targetMaturity: 4, dependencies: ["Requirement template", "Approval authority matrix"] },
    { id: "cap-342-3", name: "Impact Assessment Process", description: "A mandatory process for assessing the impact of each change on availability, security, compliance, and other systems before approval.", owner: "Enterprise Architect", relatedTools: ["ITSM", "CMDB"], targetMaturity: 4, dependencies: ["CMDB", "Change template"] },
  ],

  actions: [
    { id: "act-342-pr1", category: "Process", title: "Develop Change Requirement Template", description: "Create a comprehensive change requirement template covering business case, functional requirements, technical design, security requirements, compliance impact, and testing plan.", owner: "IT Governance Head", stakeholders: ["Enterprise Architect", "CISO", "Business Analysts"], priority: "P1", effort: "3 weeks", dependency: "Change management policy", evidenceProduced: "Requirement template" },
    { id: "act-342-pr2", category: "Process", title: "Define Requirement Approval Authority Matrix", description: "Document who must approve requirements for each change type and size, including business owner, IT lead, security, and compliance sign-offs.", owner: "IT Governance Head", stakeholders: ["CIO", "CISO", "Compliance Officer"], priority: "P1", effort: "2 weeks", dependency: "Requirement template", evidenceProduced: "Approval authority matrix" },
    { id: "act-342-p1", category: "People", title: "Train Business Analysts and Project Managers", description: "Train BA and PM staff on the requirement definition template, quality standards, and approval process.", owner: "IT Governance Head", stakeholders: ["PMO", "Business Analysis Team"], priority: "P1", effort: "2 weeks", dependency: "Template approved", evidenceProduced: "Training records" },
    { id: "act-342-t1", category: "Technology", title: "Configure Requirement Management in ITSM/ALM Tool", description: "Configure the ITSM or ALM tool to capture, track, and approve requirements against the standard template.", owner: "IT Governance Head", stakeholders: ["ITSM administrators"], priority: "P2", effort: "4 weeks", dependency: "Template and approval process", evidenceProduced: "Tool configuration screenshots" },
    { id: "act-342-pr3", category: "Process", title: "Implement Mandatory Impact Assessment", description: "Make impact assessment mandatory for all Normal changes, requiring assessment of availability, security, compliance, and dependency impacts before CAB review.", owner: "Enterprise Architect", stakeholders: ["IT Domain Heads", "CISO"], priority: "P1", effort: "2 weeks", dependency: "CMDB available", evidenceProduced: "Impact assessment records" },
  ],

  raciMatrix: [
    { activity: "Define change requirements", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "C", enterpriseArchitect: "R", itOperationsHead: "C", applicationOwner: "R", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Approve change requirements", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "I", pmo: "C", vendorManager: "I" },
    { activity: "Conduct change impact assessment", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "C", enterpriseArchitect: "R", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "I", pmo: "C", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-342-1", question: "Show me the requirements documentation for a recent significant change. Who approved it?", whySamaMayAsk: "SAMA reviews requirement documentation quality as evidence of change management rigour.", expectedAnswer: "Here is the requirement document for [change]. It includes the business case, functional requirements, technical design, security requirements, and compliance impact assessment. It was approved by the business owner, IT lead, CISO, and Compliance Officer on [dates].", supportingEvidence: ["Change requirement documents", "Approval sign-off records"] },
    { id: "aq-342-2", question: "What is your process for assessing the impact of a change on other systems?", whySamaMayAsk: "SAMA tests whether dependency management is part of change planning.", expectedAnswer: "All Normal changes require a mandatory impact assessment using our CMDB. The Enterprise Architect reviews dependencies, and potentially impacted application and infrastructure owners are consulted. This is completed before CAB review.", supportingEvidence: ["CMDB configuration", "Impact assessment records", "CAB review documentation"] },
    { id: "aq-342-3", question: "How do you ensure security requirements are captured in every change?", whySamaMayAsk: "SAMA assesses whether security is built into the change process.", expectedAnswer: "Our change requirement template has a mandatory security section completed with CISO input. No change proceeds without a security sign-off. Security requirements are then carried through to testing (control 3.4.5) and release (3.4.7).", supportingEvidence: ["Change template security section", "CISO sign-off records", "Security test records"] },
  ],

  evidenceChecklist: [
    { id: "ev-342-1", name: "Change Requirement Template", description: "Standard template for capturing all change requirement dimensions.", type: "Document", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-342", domain: "IT Project & Change Management" },
    { id: "ev-342-2", name: "Completed Change Requirement Documents", description: "Sample completed requirement documents for recent significant changes.", type: "Document", owner: "Application Owner", updateFrequency: "Per change", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-342", domain: "IT Project & Change Management" },
    { id: "ev-342-3", name: "Requirement Approval Records", description: "Sign-off records showing multi-stakeholder approval of change requirements.", type: "Record", owner: "IT Governance Head", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-342", domain: "IT Project & Change Management" },
    { id: "ev-342-4", name: "Change Impact Assessments", description: "Completed impact assessments for Normal changes showing dependency analysis.", type: "Document", owner: "Enterprise Architect", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-342", domain: "IT Project & Change Management" },
    { id: "ev-342-5", name: "Approval Authority Matrix", description: "Document defining who approves requirements for each change type and size.", type: "Document", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-342", domain: "IT Project & Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Requirements are informal or verbal. Changes proceed without documented requirements.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Create requirement template", "Mandate documentation", "Define approvers"] },
    { level: 2, label: "Developing", description: "Some requirements are documented but inconsistently. No standard template or mandatory approval.", documentationExpected: ["Basic requirement documents"], operatingEvidenceExpected: [], gapsToClose: ["Standardise template", "Mandate approval", "Enforce impact assessment"] },
    { level: 3, label: "Defined", description: "Standard template in use. Approval process defined. Impact assessments conducted.", documentationExpected: ["Template", "Completed requirements", "Approval records"], operatingEvidenceExpected: ["Impact assessments"], gapsToClose: ["Automate in ITSM", "Track requirement quality metrics"] },
    { level: 4, label: "Managed", description: "Requirements are consistently documented, approved, and tracked in ITSM. Quality metrics show high completeness rate. SAMA would accept this.", documentationExpected: ["All L3 + quality metrics"], operatingEvidenceExpected: ["ITSM records", "Quality reports"], gapsToClose: ["Introduce AI-assisted requirement completeness checking"] },
    { level: 5, label: "Optimised", description: "Requirement quality is measured and continuously improved. AI tools assist in identifying incomplete or ambiguous requirements before approval.", documentationExpected: ["All L4 + AI config"], operatingEvidenceExpected: ["Quality trend data", "AI review records"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-342-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current change requirement documentation quality", owner: "IT Governance Head", dependency: "None", deliverable: "Quality assessment", evidenceProduced: "Assessment report" },
    { id: "rm-342-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop change requirement template and approval matrix", owner: "IT Governance Head", dependency: "Assessment", deliverable: "Template, approval matrix", evidenceProduced: "Template document" },
    { id: "rm-342-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–3", activity: "Mandate template use and configure in ITSM tool", owner: "IT Governance Head", dependency: "Template approved", deliverable: "Configured ITSM", evidenceProduced: "ITSM config, first completed templates" },
    { id: "rm-342-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 3+", activity: "Collect requirement approval records for all Normal changes", owner: "IT Governance Head", dependency: "Process live", deliverable: "Requirement records library", evidenceProduced: "Completed requirement docs" },
    { id: "rm-342-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Measure requirement quality and prepare SAMA evidence pack", owner: "IT Governance Head", dependency: "6 months data", deliverable: "Quality metrics, SAMA pack", evidenceProduced: "Quality report" },
  ],

  commonGaps: [
    "Requirements are documented but the security section is always blank – CISO is not consulted until testing",
    "Impact assessment covers technical dependencies only – business, compliance, and regulatory impacts are not assessed",
    "No standard template – each project team uses its own format, making governance review difficult",
    "Requirements are approved by the project manager only – business owner and security are not formally included",
    "Requirement documents are not stored centrally – they live in email threads or individual laptops",
  ],
  relatedControls: ["3.4.1", "3.4.5", "3.4.6", "3.4.7"],
};
