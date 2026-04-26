import type { Control } from "@/types";

export const control341: Control = {
  id: "ctrl-341",
  controlNumber: "3.4.1",
  title: "System Change Governance",
  domain: "IT Project & Change Management",
  domainId: "dom-34",
  subdomain: "IT Change Management",
  subdomainId: "sub-341",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Governance Head",
  supportingStakeholders: ["CIO", "CTO", "IT Operations Head", "CISO", "Enterprise Architect", "PMO"],

  plainEnglishInterpretation:
    "The bank must have a formal governance framework for all IT changes. This includes change classification, a Change Advisory Board (CAB), formal approval processes, change records, and post-implementation review. No change to production systems should occur without proper authorisation.",
  samaIntent:
    "Uncontrolled changes to IT systems are one of the leading causes of outages and security incidents. SAMA requires banks to demonstrate that change management is governed, documented, and enforced – with a clear audit trail from request to implementation.",
  whyItMatters:
    "IT changes – if not properly governed – can cause system outages, introduce security vulnerabilities, fail regulatory tests, and corrupt production data. A strong change governance framework reduces these risks and creates the audit trail SAMA needs during examination.",
  riskIfNotImplemented:
    "Unauthorised changes causing production outages, failed audits, security vulnerabilities introduced through changes, inability to trace the cause of incidents to specific changes, and SAMA findings of inadequate change control.",

  requiredCapabilities: [
    { id: "cap-341-1", name: "Change Advisory Board (CAB)", description: "A formal governance body that reviews, approves, and oversees significant IT changes on a defined schedule.", owner: "IT Governance Head", relatedTools: ["ServiceNow CAB workbench", "Meeting tools"], targetMaturity: 3, dependencies: ["Change management policy"] },
    { id: "cap-341-2", name: "Change Classification Framework", description: "A formal framework classifying changes into Standard, Normal, and Emergency categories with specific governance requirements for each.", owner: "IT Governance Head", relatedTools: ["ServiceNow", "JIRA"], targetMaturity: 3, dependencies: ["Change management policy"] },
    { id: "cap-341-3", name: "Change Approval Workflow", description: "Automated workflow enforcing the appropriate approval chain for each change category before implementation is permitted.", owner: "IT Governance Head", relatedTools: ["ServiceNow", "JIRA Service Management"], targetMaturity: 4, dependencies: ["CAB structure", "Classification framework"] },
  ],

  actions: [
    { id: "act-341-pr1", category: "Process", title: "Develop Change Management Policy", description: "Create a comprehensive change management policy covering change classification, approval authority, CAB governance, emergency change process, and post-implementation review requirements.", owner: "IT Governance Head", stakeholders: ["CIO", "CTO", "CISO", "Enterprise Architect"], priority: "P1", effort: "4 weeks", dependency: "IT governance framework", evidenceProduced: "Change management policy" },
    { id: "act-341-pr2", category: "Process", title: "Establish Change Advisory Board", description: "Form the CAB with defined membership, meeting frequency (weekly), quorum rules, and decision-making authority for Normal and significant Standard changes.", owner: "IT Governance Head", stakeholders: ["CIO", "CTO", "IT Operations Head", "CISO"], priority: "P1", effort: "3 weeks", dependency: "Change management policy", evidenceProduced: "CAB ToR, first CAB minutes" },
    { id: "act-341-p1", category: "People", title: "Train Change Managers and Requestors", description: "Train all IT staff who raise or manage changes on the change management process, classification criteria, and ITSM tool usage.", owner: "IT Governance Head", stakeholders: ["IT Domain Heads", "PMO"], priority: "P1", effort: "3 weeks", dependency: "Policy and process defined", evidenceProduced: "Training records" },
    { id: "act-341-pr3", category: "Process", title: "Implement Emergency Change Process", description: "Define and document a clear emergency change process with post-implementation review requirements to ensure emergency changes don't bypass governance permanently.", owner: "IT Governance Head", stakeholders: ["CIO", "IT Operations Head", "CISO"], priority: "P1", effort: "2 weeks", dependency: "Change management policy", evidenceProduced: "Emergency change procedure" },
    { id: "act-341-t1", category: "Technology", title: "Configure Change Management Module in ITSM", description: "Configure the ITSM tool to enforce change classification, approval workflow, CAB review, and post-implementation review for all changes.", owner: "IT Governance Head", stakeholders: ["ITSM administrators"], priority: "P1", effort: "6 weeks", dependency: "Change policy and process", evidenceProduced: "ITSM change module configuration" },
  ],

  raciMatrix: [
    { activity: "Develop and maintain change management policy", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "C", pmo: "C", vendorManager: "I" },
    { activity: "Chair and operate Change Advisory Board", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "I" },
    { activity: "Approve standard and normal IT changes", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-341-1", question: "How many changes were made to production systems in the last 12 months? What percentage were emergency changes?", whySamaMayAsk: "SAMA uses change volume and emergency change ratios as maturity indicators.", expectedAnswer: "We implemented [X] changes in the last 12 months. [X]% were Standard, [X]% were Normal, and [X]% were Emergency. Emergency changes are reviewed by the post-implementation CAB and the target is to keep them below 5%.", supportingEvidence: ["ITSM change reports", "Change type analysis", "Emergency change records"] },
    { id: "aq-341-2", question: "Show me the CAB meeting records for the last quarter.", whySamaMayAsk: "SAMA verifies that governance bodies actually operate.", expectedAnswer: "Here are the last [X] weeks of CAB minutes. Each meeting shows changes reviewed, decisions made, conditions attached, and changes rejected. The CAB met every [day] with [X] members in attendance.", supportingEvidence: ["CAB meeting minutes", "Change approval records", "CAB attendance records"] },
    { id: "aq-341-3", question: "What happens when a change causes a production incident?", whySamaMayAsk: "SAMA tests whether change-related incidents trigger governance review and learning.", expectedAnswer: "Change-related incidents automatically trigger a post-implementation review. The change record is linked to the incident record in our ITSM tool. Root cause is identified and the change management process is updated if a process failure contributed.", supportingEvidence: ["ITSM change-incident linkage", "PIR records", "Process improvement records"] },
  ],

  evidenceChecklist: [
    { id: "ev-341-1", name: "Change Management Policy", description: "Formal policy covering change classification, approval, CAB governance, and emergency change process.", type: "Policy", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-341", domain: "IT Project & Change Management" },
    { id: "ev-341-2", name: "CAB Terms of Reference", description: "Formal CAB charter including membership, frequency, quorum, and decision authority.", type: "Document", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-341", domain: "IT Project & Change Management" },
    { id: "ev-341-3", name: "CAB Meeting Minutes (Last 12 Weeks)", description: "Signed CAB minutes showing changes reviewed, approved, rejected, or conditioned.", type: "Minutes", owner: "IT Governance Head", updateFrequency: "Weekly", maturityLevelSupported: 4, status: "Partial", controlId: "ctrl-341", domain: "IT Project & Change Management" },
    { id: "ev-341-4", name: "ITSM Change Records Extract", description: "Extract showing all changes by type, status, approver, and outcome.", type: "Record", owner: "IT Governance Head", updateFrequency: "Ongoing", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-341", domain: "IT Project & Change Management" },
    { id: "ev-341-5", name: "Emergency Change Register", description: "Register of all emergency changes with post-implementation review status.", type: "Record", owner: "IT Governance Head", updateFrequency: "Ongoing", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-341", domain: "IT Project & Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Changes are made informally without documentation or approval. No CAB exists.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Document change process", "Implement change records", "Establish approval requirement"] },
    { level: 2, label: "Developing", description: "Some change process exists. Changes are logged. Approval is informal. No structured CAB.", documentationExpected: ["Basic change procedure"], operatingEvidenceExpected: ["Change logs"], gapsToClose: ["Formalise CAB", "Define classification", "Mandate approvals"] },
    { level: 3, label: "Defined", description: "Formal change management policy, CAB, classification framework, and ITSM support are in place.", documentationExpected: ["Change policy", "CAB ToR", "ITSM configuration"], operatingEvidenceExpected: ["CAB minutes", "Change records"], gapsToClose: ["Implement post-implementation reviews", "Track emergency change ratio"] },
    { level: 4, label: "Managed", description: "Change management is data-driven. Change success rates, emergency ratios, and PIR completion are measured. SAMA would accept this.", documentationExpected: ["All L3 + performance metrics"], operatingEvidenceExpected: ["Change KPIs", "PIR records", "CAB minutes"], gapsToClose: ["Automate change risk assessment"] },
    { level: 5, label: "Optimised", description: "Change management uses automated risk scoring, intelligent classification, and continuous improvement based on change-related incident analysis.", documentationExpected: ["All L4 + AI models"], operatingEvidenceExpected: ["Automated risk scores", "Continuous improvement records"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-341-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Assess current change management maturity", owner: "IT Governance Head", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-341-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop change management policy and classification framework", owner: "IT Governance Head", dependency: "Gap assessment", deliverable: "Change policy, classification matrix", evidenceProduced: "Policy documents" },
    { id: "rm-341-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–3", activity: "Establish CAB and configure ITSM change module", owner: "IT Governance Head", dependency: "Policy approved", deliverable: "Active CAB, configured ITSM", evidenceProduced: "CAB ToR, ITSM config, first CAB minutes" },
    { id: "rm-341-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 3+", activity: "Run weekly CAB and collect change governance records", owner: "IT Governance Head", dependency: "CAB established", deliverable: "Weekly CAB minutes", evidenceProduced: "CAB minutes, change records" },
    { id: "rm-341-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Annual change management effectiveness review", owner: "IT Governance Head", dependency: "6 months operation", deliverable: "Effectiveness review", evidenceProduced: "Review report" },
  ],

  commonGaps: [
    "CAB exists on paper but rarely meets – changes are approved informally by email",
    "Emergency changes account for 30%+ of all changes – indicating the normal process is being bypassed",
    "Post-implementation reviews are not mandatory – only done when something goes wrong",
    "Change records in ITSM are incomplete – impact assessment and test evidence are missing",
    "Standard changes are pre-approved but not reviewed periodically to ensure they remain low-risk",
  ],
  relatedControls: ["3.4.2", "3.4.5", "3.4.6", "3.4.7", "3.3.8"],
};
