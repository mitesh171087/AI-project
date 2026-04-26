import type { Control } from "@/types";

export const control323: Control = {
  id: "ctrl-323",
  controlNumber: "3.2.3",
  title: "Risk Treatment",
  domain: "IT Risk Management",
  domainId: "dom-32",
  subdomain: "IT Risk Management Framework",
  subdomainId: "sub-321",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Missing",
  primaryOwner: "IT Risk Manager",
  supportingStakeholders: ["CIO", "CISO", "IT Operations Head", "Application Owner", "Infrastructure Owner", "PMO"],

  plainEnglishInterpretation:
    "Once IT risks are identified, the bank must respond to each risk through a defined treatment strategy: accept, mitigate, transfer, or avoid. Treatment plans must be documented, assigned to owners, and tracked to completion. Residual risks must be formally accepted by an authorised party.",
  samaIntent:
    "SAMA expects risk identification to lead to concrete action, not documentation for its own sake. Evidence of risk treatment demonstrates that the bank is actively reducing its IT risk exposure, not simply cataloguing risks.",
  whyItMatters:
    "Identifying risks without treating them creates a false sense of security. SAMA will ask to see evidence that treatment plans are being executed and that residual risks are formally accepted at the appropriate level of authority.",
  riskIfNotImplemented:
    "Identified risks go untreated, residual risk accumulates, incidents occur that were predictable, and SAMA finds that the risk register is a theoretical exercise rather than an operational tool.",

  requiredCapabilities: [
    { id: "cap-323-1", name: "Risk Treatment Planning Process", description: "A structured process for selecting and documenting risk treatment strategies with owners, timelines, and cost estimates.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "Project management tool"], targetMaturity: 3, dependencies: ["IT risk register", "Risk appetite"] },
    { id: "cap-323-2", name: "Risk Acceptance Framework", description: "A formal framework defining who can accept residual risks at each threshold level, with documented sign-off required.", owner: "CIO", relatedTools: ["GRC tool", "SharePoint"], targetMaturity: 4, dependencies: ["Risk appetite statement", "Risk scoring model"] },
    { id: "cap-323-3", name: "Risk Treatment Tracking", description: "A mechanism to track progress of risk treatment actions and report completion status to governance bodies.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "JIRA", "ServiceNow"], targetMaturity: 4, dependencies: ["Risk treatment plans", "GRC tool"] },
  ],

  actions: [
    { id: "act-323-pr1", category: "Process", title: "Develop Risk Treatment Planning Procedures", description: "Document the process for selecting, planning, and executing risk treatment strategies for each category of IT risk.", owner: "IT Risk Manager", stakeholders: ["CIO", "IT Domain Heads"], priority: "P1", effort: "4 weeks", dependency: "Risk register established", evidenceProduced: "Risk treatment procedure document" },
    { id: "act-323-pr2", category: "Process", title: "Create Risk Acceptance Policy and Delegation of Authority", description: "Define and document the authority levels for accepting residual IT risks, ensuring high-risk acceptances require CIO or Board approval.", owner: "CIO", stakeholders: ["IT Risk Manager", "Board Risk Committee"], priority: "P1", effort: "3 weeks", dependency: "Risk scoring model", evidenceProduced: "Risk acceptance policy, delegation matrix" },
    { id: "act-323-p1", category: "People", title: "Train Risk Owners on Treatment Planning", description: "Train all designated risk owners on how to create and execute risk treatment plans within the bank's GRC framework.", owner: "IT Risk Manager", stakeholders: ["IT Domain Heads"], priority: "P1", effort: "2 weeks", dependency: "Treatment procedures defined", evidenceProduced: "Training records" },
    { id: "act-323-t1", category: "Technology", title: "Configure Risk Treatment Workflow in GRC Tool", description: "Set up the GRC tool to track risk treatment plans with automated reminders for milestone dates and escalation when plans are overdue.", owner: "IT Risk Manager", stakeholders: ["IT Governance Head"], priority: "P2", effort: "4 weeks", dependency: "GRC tool implemented", evidenceProduced: "GRC treatment module, workflow configuration" },
    { id: "act-323-pr3", category: "Process", title: "Implement Risk Treatment Review in IT Risk Committee", description: "Add a standing agenda item to the IT Risk Committee for reviewing treatment plan progress and approving risk acceptances.", owner: "IT Risk Manager", stakeholders: ["CIO", "IT Domain Heads"], priority: "P1", effort: "2 weeks", dependency: "IT Risk Committee established", evidenceProduced: "Committee minutes with treatment reviews" },
  ],

  raciMatrix: [
    { activity: "Select risk treatment strategy for each risk", boardTechnologyCommittee: "I", cio: "A", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "I" },
    { activity: "Execute risk treatment actions", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "R", applicationOwner: "R", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Formally accept residual risks", boardTechnologyCommittee: "A", cio: "R", cto: "I", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "C", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-323-1", question: "Can you show evidence that identified IT risks have documented treatment plans?", whySamaMayAsk: "SAMA checks that risk identification leads to action, not just documentation.", expectedAnswer: "Yes – every risk in our register has a documented treatment strategy, plan owner, target date, and status. Treatment plans are reviewed monthly by the IT Risk Manager and quarterly by the IT Risk Committee.", supportingEvidence: ["IT risk register with treatment columns", "GRC treatment tracking", "IT Risk Committee minutes"] },
    { id: "aq-323-2", question: "How do you handle risks that exceed your risk appetite?", whySamaMayAsk: "SAMA tests whether risk appetite is operationally enforced.", expectedAnswer: "Any risk scoring above our High threshold triggers mandatory escalation to the CIO within 48 hours. If a risk cannot be immediately mitigated, the CIO must formally accept it with a documented remediation timeline. Risks above our Very High threshold require Board Technology Committee awareness.", supportingEvidence: ["Risk acceptance records", "Escalation logs", "Board committee minutes"] },
    { id: "aq-323-3", question: "What is your process for ensuring risk treatment plans are completed on time?", whySamaMayAsk: "SAMA looks for evidence of active oversight of treatment execution.", expectedAnswer: "Our GRC tool sends automated reminders to risk owners 30 days and 7 days before treatment milestones. Overdue plans trigger escalation to the IT Risk Committee. Completion rates are tracked in our IT risk dashboard.", supportingEvidence: ["GRC reminder configuration", "Escalation records", "IT risk dashboard showing completion rates"] },
  ],

  evidenceChecklist: [
    { id: "ev-323-1", name: "Risk Treatment Plans", description: "Documented treatment plans for each IT risk in the register, showing strategy, owner, and timeline.", type: "Record", owner: "IT Risk Manager", updateFrequency: "Ongoing", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-323", domain: "IT Risk Management" },
    { id: "ev-323-2", name: "Risk Acceptance Records", description: "Formal sign-off records for risks accepted above threshold, with authority level confirmation.", type: "Record", owner: "IT Risk Manager", updateFrequency: "As required", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-323", domain: "IT Risk Management" },
    { id: "ev-323-3", name: "Risk Treatment Completion Evidence", description: "Evidence that treatment actions have been executed (e.g., system changes, training completion, vendor contract changes).", type: "Record", owner: "IT Risk Manager", updateFrequency: "Ongoing", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-323", domain: "IT Risk Management" },
    { id: "ev-323-4", name: "IT Risk Committee Treatment Review Minutes", description: "Committee minutes showing review of treatment plan progress.", type: "Minutes", owner: "IT Risk Manager", updateFrequency: "Monthly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-323", domain: "IT Risk Management" },
    { id: "ev-323-5", name: "GRC Risk Treatment Workflow Screenshots", description: "Screenshots of the GRC tool showing treatment tracking, reminders, and escalation configuration.", type: "Screenshot", owner: "IT Governance Head", updateFrequency: "As required", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-323", domain: "IT Risk Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Risk treatment is ad hoc. No documented treatment plans or formal acceptance process.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Document treatment options", "Assign owners to risks", "Define acceptance authority"] },
    { level: 2, label: "Developing", description: "Some risks have treatment plans but they are inconsistent and not formally tracked.", documentationExpected: ["Basic treatment records"], operatingEvidenceExpected: [], gapsToClose: ["Standardise treatment plans", "Define acceptance process", "Establish tracking"] },
    { level: 3, label: "Defined", description: "All risks have documented treatment plans with owners and dates. Risk acceptance process is defined and used.", documentationExpected: ["Treatment plans", "Acceptance policy"], operatingEvidenceExpected: ["Acceptance records", "Treatment updates"], gapsToClose: ["Automate tracking in GRC", "Implement escalation alerts"] },
    { level: 4, label: "Managed", description: "Treatment tracking is automated in GRC. Completion rates are measured. Acceptance authority is enforced. SAMA would accept this.", documentationExpected: ["All L3 + GRC configuration"], operatingEvidenceExpected: ["GRC dashboards", "Acceptance records", "Committee minutes"], gapsToClose: ["Benchmark treatment effectiveness"] },
    { level: 5, label: "Optimised", description: "Risk treatment effectiveness is continuously measured and optimised. Treatment strategies are informed by threat intelligence and control testing outcomes.", documentationExpected: ["All L4 + effectiveness metrics"], operatingEvidenceExpected: ["Treatment effectiveness reports"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-323-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current risk treatment practices and identify gaps", owner: "IT Risk Manager", dependency: "Risk register available", deliverable: "Treatment gap report", evidenceProduced: "Gap report" },
    { id: "rm-323-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop risk treatment planning procedure and acceptance policy", owner: "IT Risk Manager", dependency: "Gap report", deliverable: "Treatment procedure, acceptance policy", evidenceProduced: "Policy documents" },
    { id: "rm-323-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Create treatment plans for all risks in the register", owner: "IT Risk Owners", dependency: "Procedure and policy", deliverable: "Completed treatment plans", evidenceProduced: "Treatment plans in GRC" },
    { id: "rm-323-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Execute treatments and evidence completion", owner: "IT Risk Owners", dependency: "Plans in place", deliverable: "Treatment completion evidence", evidenceProduced: "Evidence records, GRC updates" },
    { id: "rm-323-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 6+", activity: "Review treatment effectiveness and prepare for SAMA assessment", owner: "IT Risk Manager", dependency: "6 months of operation", deliverable: "Treatment effectiveness report", evidenceProduced: "Effectiveness report, SAMA pack" },
  ],

  commonGaps: [
    "Risks are in the register but no treatment plans are documented – banks say 'we know about it' to SAMA",
    "Risk acceptance is informal – senior managers verbally accept risks without documented sign-off",
    "Treatment plans have owners but no target dates – they are never completed or reviewed",
    "Transfer options (insurance, contractual) are not evaluated as part of treatment strategy",
    "Residual risk is not re-scored after treatment – the register still shows the original risk score",
  ],
  relatedControls: ["3.2.1", "3.2.2", "3.2.4"],
};
