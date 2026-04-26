import type { Control } from "@/types";

export const control347: Control = {
  id: "ctrl-347",
  controlNumber: "3.4.7",
  title: "Change Release Management",
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
  supportingStakeholders: ["CTO", "IT Operations Head", "Application Owner", "Infrastructure Owner", "PMO"],

  plainEnglishInterpretation:
    "The bank must have a formal release management process that controls how IT changes are deployed to production. This includes release scheduling, release packages, back-out procedures, release authorisation, post-release verification, and release notes. No production release should occur outside a defined release window without emergency authorisation.",
  samaIntent:
    "SAMA expects that changes to production systems are deployed in a controlled, scheduled, and documented manner. Uncontrolled releases are a primary cause of production outages and create an untrackable change history that SAMA views as evidence of immature IT management.",
  whyItMatters:
    "Even well-tested changes can cause production issues if released without coordination, communication, or back-out planning. Release management ensures that deployments are coordinated, risks are communicated, and recovery procedures are ready if needed.",
  riskIfNotImplemented:
    "Unplanned outages from uncoordinated releases, inability to back out failed changes quickly, unknown production state due to undocumented releases, and SAMA findings of weak change control.",

  requiredCapabilities: [
    { id: "cap-347-1", name: "Release Schedule and Window Management", description: "A formal release calendar with defined release windows, blackout periods (e.g., Ramadan, year-end), and scheduling process.", owner: "IT Governance Head", relatedTools: ["ServiceNow", "ITSM CAB module"], targetMaturity: 3, dependencies: ["Change management policy", "CAB process"] },
    { id: "cap-347-2", name: "Release Package and Back-out Procedure", description: "A mandatory requirement for a release package (what is being released) and back-out procedure (how to reverse if needed) for every Normal release.", owner: "IT Operations Head", relatedTools: ["ServiceNow", "CI/CD pipeline", "Version control"], targetMaturity: 4, dependencies: ["Change management policy", "Version control"] },
    { id: "cap-347-3", name: "Post-Release Verification (PRV) Process", description: "A formal process for verifying that a release has deployed correctly and the system is functioning as expected immediately post-release.", owner: "IT Operations Head", relatedTools: ["Monitoring platform", "ITSM"], targetMaturity: 4, dependencies: ["Monitoring platform", "Release procedure"] },
  ],

  actions: [
    { id: "act-347-pr1", category: "Process", title: "Define Release Management Policy and Schedule", description: "Document the release management process including release windows, scheduling approach, release package requirements, back-out procedure mandate, and post-release verification.", owner: "IT Governance Head", stakeholders: ["CTO", "IT Operations Head", "Application Owners"], priority: "P1", effort: "3 weeks", dependency: "Change management policy", evidenceProduced: "Release management policy, release calendar" },
    { id: "act-347-pr2", category: "Process", title: "Mandate Back-out Procedures for All Releases", description: "Require documented back-out procedures for all Normal releases, tested in the test environment, and verified to be executable within the release window.", owner: "IT Operations Head", stakeholders: ["Application Owners", "Infrastructure Owner"], priority: "P1", effort: "2 weeks", dependency: "Release policy", evidenceProduced: "Back-out procedure records" },
    { id: "act-347-p1", category: "People", title: "Train Release Managers", description: "Train designated release managers on the release management process, back-out procedures, and ITSM release workflow.", owner: "IT Governance Head", stakeholders: ["IT Operations Head", "Application Owners"], priority: "P1", effort: "2 weeks", dependency: "Policy defined", evidenceProduced: "Training records" },
    { id: "act-347-t1", category: "Technology", title: "Configure Release Management in ITSM", description: "Configure the ITSM tool to manage release scheduling, release package documentation, back-out procedure attachment, and post-release verification tasks.", owner: "IT Governance Head", stakeholders: ["ITSM administrators"], priority: "P1", effort: "4 weeks", dependency: "ITSM change module configured", evidenceProduced: "ITSM release module configuration" },
    { id: "act-347-t2", category: "Technology", title: "Implement CI/CD Pipeline for Controlled Deployments", description: "Deploy a CI/CD pipeline that enforces approved release packages, blocks deployments outside release windows, and generates release artefacts automatically.", owner: "CTO", stakeholders: ["IT Operations Head", "Application Owners"], priority: "P2", effort: "3 months", dependency: "CI/CD tool, version control", evidenceProduced: "Pipeline configuration, deployment logs" },
  ],

  raciMatrix: [
    { activity: "Schedule and authorise releases", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Execute production release", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "I", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "R", applicationOwner: "R", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Conduct post-release verification", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "I", ciso: "I", enterpriseArchitect: "I", itOperationsHead: "R", applicationOwner: "R", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-347-1", question: "Show me your release calendar for the last quarter and demonstrate how releases are scheduled and approved.", whySamaMayAsk: "SAMA verifies that releases are planned and not ad hoc.", expectedAnswer: "Here is our release calendar. Releases are scheduled in advance through the ITSM tool. Each release is reviewed at the weekly CAB and formally authorised before the release window. We have defined blackout periods during critical business events.", supportingEvidence: ["Release calendar", "ITSM release records", "CAB minutes approving releases"] },
    { id: "aq-347-2", question: "What back-out procedure do you have if a release fails? Has it ever been invoked?", whySamaMayAsk: "SAMA tests whether release risk is managed and whether recovery is prepared.", expectedAnswer: "Every release has a documented back-out procedure that is tested before the release date. We have invoked back-out [X] times in the last 12 months. The most recent was [describe] – we reversed the release within [X] minutes using the documented back-out steps.", supportingEvidence: ["Back-out procedures", "Back-out invocation records", "ITSM release records"] },
    { id: "aq-347-3", question: "How do you verify that a release has been successful?", whySamaMayAsk: "SAMA assesses whether post-release controls are in place.", expectedAnswer: "All releases include a post-release verification step where the release manager and application owner confirm system health checks, key transaction tests, and monitoring alerts are clear. This is documented in the ITSM release record before the release is closed.", supportingEvidence: ["PRV records in ITSM", "Monitoring screenshots post-release", "Sign-off records"] },
  ],

  evidenceChecklist: [
    { id: "ev-347-1", name: "Release Management Policy", description: "Policy defining release windows, scheduling process, back-out requirements, and post-release verification.", type: "Policy", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-347", domain: "IT Project & Change Management" },
    { id: "ev-347-2", name: "Release Calendar (Last 12 Months)", description: "Release schedule showing all planned and completed releases with approval status.", type: "Record", owner: "IT Governance Head", updateFrequency: "Rolling", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-347", domain: "IT Project & Change Management" },
    { id: "ev-347-3", name: "Back-out Procedures for Recent Releases", description: "Sample back-out procedures for recent Normal releases.", type: "Document", owner: "IT Operations Head", updateFrequency: "Per release", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-347", domain: "IT Project & Change Management" },
    { id: "ev-347-4", name: "Post-Release Verification Records", description: "Completed PRV records for releases showing system health confirmation.", type: "Record", owner: "IT Operations Head", updateFrequency: "Per release", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-347", domain: "IT Project & Change Management" },
    { id: "ev-347-5", name: "CI/CD Pipeline Deployment Logs", description: "Automated deployment logs showing release package, deployment timestamp, and result.", type: "Log", owner: "CTO", updateFrequency: "Per release", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-347", domain: "IT Project & Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Releases happen ad hoc with no schedule, documentation, or back-out planning.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define release windows", "Mandate release records", "Require back-out planning"] },
    { level: 2, label: "Developing", description: "Some release scheduling exists. Back-out is considered but not formally documented.", documentationExpected: ["Basic release procedure"], operatingEvidenceExpected: ["Some release records"], gapsToClose: ["Formalise policy", "Mandate back-out docs", "Implement PRV"] },
    { level: 3, label: "Defined", description: "Formal release policy, scheduled releases, mandatory back-out procedures, and post-release verification in place.", documentationExpected: ["Release policy", "Release calendar", "Back-out procedures"], operatingEvidenceExpected: ["ITSM release records", "PRV records"], gapsToClose: ["Automate in CI/CD", "Track release success rates"] },
    { level: 4, label: "Managed", description: "Release management is automated via CI/CD. Deployment logs provide full audit trail. Release success rate is measured. SAMA would accept this.", documentationExpected: ["All L3 + CI/CD config"], operatingEvidenceExpected: ["Deployment logs", "Success rate metrics", "PRV records"], gapsToClose: ["Implement zero-touch deployment for Standard changes"] },
    { level: 5, label: "Optimised", description: "Fully automated deployment with zero-touch releases for Standard changes, real-time monitoring, and automatic rollback on failure detection.", documentationExpected: ["All L4 + automation design"], operatingEvidenceExpected: ["Automated rollback records", "Zero-touch deployment metrics"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-347-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current release process and identify gaps", owner: "IT Governance Head", dependency: "None", deliverable: "Release gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-347-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Define release management policy, windows, and back-out requirements", owner: "IT Governance Head", dependency: "Change policy", deliverable: "Release policy and calendar", evidenceProduced: "Policy document" },
    { id: "rm-347-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–3", activity: "Configure ITSM release module and train release managers", owner: "IT Governance Head", dependency: "Policy approved", deliverable: "Configured ITSM, trained staff", evidenceProduced: "ITSM config, training records" },
    { id: "rm-347-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 3+", activity: "Operate release process and collect PRV records", owner: "IT Operations Head", dependency: "Process live", deliverable: "Release records with PRV", evidenceProduced: "Release records, PRV evidence" },
    { id: "rm-347-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Annual release management review", owner: "IT Governance Head", dependency: "6 months data", deliverable: "Release effectiveness report", evidenceProduced: "Review report" },
  ],

  commonGaps: [
    "Releases are deployed outside release windows during business hours causing customer impact",
    "Back-out procedures are generic or missing – when releases fail, recovery is improvised",
    "Post-release verification is verbal confirmation between team members with no documented record",
    "Release notes do not describe what was changed – making incident investigation difficult",
    "Emergency releases bypass the formal process and are never retrospectively documented",
  ],
  relatedControls: ["3.4.1", "3.4.2", "3.4.5", "3.4.6", "3.4.9"],
};
