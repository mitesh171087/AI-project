import type { Control } from "@/types";

export const control3310: Control = {
  id: "ctrl-3310",
  controlNumber: "3.3.10",
  title: "Data Backup and Recoverability",
  domain: "IT Operations",
  domainId: "dom-33",
  subdomain: "IT Operations Management",
  subdomainId: "sub-3310",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 3,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "Infrastructure Owner",
  supportingStakeholders: ["CIO", "IT Operations Head", "Application Owner", "Business Continuity Manager", "IT Risk Manager"],

  plainEnglishInterpretation:
    "The bank must ensure all critical IT systems and data are backed up according to a defined schedule, that backups are stored securely (including offsite/offline copies), and that data recovery procedures are tested regularly and proven to meet defined Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).",
  samaIntent:
    "SAMA requires banks to demonstrate that they can recover from data loss events within defined timeframes. Backup without tested recovery is not sufficient – SAMA expects evidence that recovery works, not just that backups are taken.",
  whyItMatters:
    "Data is a bank's most critical asset. Loss of transactional or customer data – or inability to recover within required timeframes – can be catastrophic. SAMA considers untested backup and recovery processes to be a critical control gap.",
  riskIfNotImplemented:
    "Data loss in a cyber attack or system failure, inability to recover within SAMA-acceptable timeframes, operational failure, customer harm, and regulatory enforcement.",

  requiredCapabilities: [
    { id: "cap-3310-1", name: "Backup Policy and Schedule", description: "A formal backup policy defining backup scope, frequency, retention, and storage requirements for all critical systems.", owner: "Infrastructure Owner", relatedTools: ["Veeam", "Commvault", "Azure Backup"], targetMaturity: 3, dependencies: ["IT asset register", "Business continuity requirements"] },
    { id: "cap-3310-2", name: "Offsite/Offline Backup Storage", description: "Secure, geographically separated backup storage with immutable copies for ransomware protection.", owner: "Infrastructure Owner", relatedTools: ["Azure/AWS DR site", "Tape offsite storage", "Immutable backup solutions"], targetMaturity: 4, dependencies: ["Backup policy", "DR strategy"] },
    { id: "cap-3310-3", name: "Backup Recovery Testing Programme", description: "A formal programme for testing data restoration from backups on a defined schedule, validating RTO and RPO.", owner: "Infrastructure Owner", relatedTools: ["Recovery testing environments", "DR runbooks"], targetMaturity: 4, dependencies: ["Backup infrastructure", "RTO/RPO definitions"] },
  ],

  actions: [
    { id: "act-3310-pr1", category: "Process", title: "Define RTO and RPO for All Critical Systems", description: "Work with business owners to define and formally agree Recovery Time Objectives and Recovery Point Objectives for all critical banking systems.", owner: "Business Continuity Manager", stakeholders: ["Application Owners", "CIO", "Business Unit Heads"], priority: "P1", effort: "3 weeks", dependency: "BIA completed", evidenceProduced: "RTO/RPO register" },
    { id: "act-3310-pr2", category: "Process", title: "Implement Annual Backup Recovery Test Programme", description: "Establish a formal annual (minimum) programme for testing full recovery of all critical systems from backup, with documented results and gap remediation.", owner: "Infrastructure Owner", stakeholders: ["Application Owner", "IT Operations Head", "IT Risk Manager"], priority: "P1", effort: "4 weeks (setup)", dependency: "RTO/RPO defined", evidenceProduced: "Recovery test schedule, test reports" },
    { id: "act-3310-p1", category: "People", title: "Train Backup and Recovery Operators", description: "Train infrastructure staff on backup procedures, recovery processes, and runbook execution to ensure they can execute recovery under pressure.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head"], priority: "P1", effort: "2 weeks", dependency: "Recovery runbooks completed", evidenceProduced: "Training records" },
    { id: "act-3310-t1", category: "Technology", title: "Implement Immutable Backup Solution", description: "Deploy immutable backup storage to protect against ransomware, ensuring backups cannot be encrypted or deleted by malicious actors.", owner: "Infrastructure Owner", stakeholders: ["CISO", "IT Operations Head"], priority: "P1", effort: "2 months", dependency: "Backup policy", evidenceProduced: "Immutable backup configuration, test records" },
    { id: "act-3310-t2", category: "Technology", title: "Configure Backup Monitoring and Alerting", description: "Configure automated monitoring of backup job success/failure with immediate alerting on backup failures to prevent silent data protection gaps.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head"], priority: "P1", effort: "3 weeks", dependency: "Backup solution deployed", evidenceProduced: "Monitoring config, alert logs" },
  ],

  raciMatrix: [
    { activity: "Define and maintain backup policy and schedule", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
    { activity: "Execute and monitor daily backup jobs", boardTechnologyCommittee: "I", cio: "I", cto: "I", itGovernanceHead: "I", itRiskManager: "I", ciso: "I", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "I", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Conduct and report on recovery tests", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "C", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-3310-1", question: "When was your last backup recovery test and what were the results?", whySamaMayAsk: "SAMA specifically tests whether backup testing is real and documented.", expectedAnswer: "Our last full recovery test was conducted on [date]. We tested recovery of [systems]. Core banking recovery achieved RTO of [X] hours against a target of [X] hours and RPO of [X] hours against a target of [X] hours. The test report is available.", supportingEvidence: ["Recovery test report", "RTO/RPO results", "Test sign-off record"] },
    { id: "aq-3310-2", question: "How do you protect your backups from ransomware?", whySamaMayAsk: "SAMA is increasingly focused on ransomware resilience.", expectedAnswer: "We maintain immutable backup copies that cannot be modified or deleted for 30 days. Our DR copies are in a network-isolated environment. We also maintain offline tape copies stored offsite. CISO reviews backup security controls quarterly.", supportingEvidence: ["Immutable backup configuration", "Network isolation design", "CISO review records"] },
    { id: "aq-3310-3", question: "What are your RTO and RPO for core banking systems?", whySamaMayAsk: "SAMA assesses whether the bank's recovery capabilities match its operational criticality.", expectedAnswer: "Core banking: RTO 4 hours, RPO 1 hour. Payment systems: RTO 2 hours, RPO 30 minutes. These are formally agreed with business owners and documented in our BIA. All are validated through annual testing.", supportingEvidence: ["RTO/RPO register", "BIA document", "Recovery test results"] },
  ],

  evidenceChecklist: [
    { id: "ev-3310-1", name: "IT Backup Policy", description: "Formal backup policy defining scope, frequency, retention, and storage requirements.", type: "Policy", owner: "Infrastructure Owner", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-3310", domain: "IT Operations" },
    { id: "ev-3310-2", name: "RTO/RPO Register", description: "Formally agreed RTO and RPO for all critical systems.", type: "Document", owner: "Business Continuity Manager", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-3310", domain: "IT Operations" },
    { id: "ev-3310-3", name: "Backup Job Success Reports (Last 3 Months)", description: "Daily backup monitoring reports showing success/failure rates.", type: "Report", owner: "Infrastructure Owner", updateFrequency: "Daily", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-3310", domain: "IT Operations" },
    { id: "ev-3310-4", name: "Recovery Test Reports (Last 12 Months)", description: "Formal test reports documenting recovery test scenarios, results, RTO/RPO validation, and remediation actions.", type: "Report", owner: "Infrastructure Owner", updateFrequency: "Annual minimum", maturityLevelSupported: 4, status: "Partial", controlId: "ctrl-3310", domain: "IT Operations" },
    { id: "ev-3310-5", name: "Immutable/Offsite Backup Evidence", description: "Configuration and test evidence showing that immutable and offsite backup copies exist and are accessible.", type: "Screenshot", owner: "Infrastructure Owner", updateFrequency: "Annual", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-3310", domain: "IT Operations" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Backups are taken but not monitored or tested. No documented policy or RTO/RPO.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Document backup schedule", "Define RTO/RPO", "Test recovery"] },
    { level: 2, label: "Developing", description: "Backup policy exists. Backups are monitored for success. Recovery has not been formally tested.", documentationExpected: ["Backup policy"], operatingEvidenceExpected: ["Backup monitoring logs"], gapsToClose: ["Conduct recovery test", "Define formal test programme", "Implement offsite storage"] },
    { level: 3, label: "Defined", description: "Formal backup policy, defined RTO/RPO, annual recovery testing, and offsite storage are all in place.", documentationExpected: ["Backup policy", "RTO/RPO register", "Recovery runbooks"], operatingEvidenceExpected: ["Backup logs", "Annual test report"], gapsToClose: ["Implement immutable backups", "Increase test frequency"] },
    { level: 4, label: "Managed", description: "Immutable backups, automated monitoring, regular tested recovery (at least annually), and RTO/RPO validation are all in place. SAMA would accept this.", documentationExpected: ["All L3 + immutable backup config"], operatingEvidenceExpected: ["Monitoring reports", "Test reports with RTO/RPO results"], gapsToClose: ["Introduce continuous backup testing for critical systems"] },
    { level: 5, label: "Optimised", description: "Backup and recovery is continuously tested through automated simulation. RTO/RPO is validated in near-real-time. Recovery automation reduces human error.", documentationExpected: ["All L4 + automation design"], operatingEvidenceExpected: ["Automated test results", "Continuous monitoring records"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-3310-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review backup coverage, test status, and RTO/RPO definitions", owner: "Infrastructure Owner", dependency: "None", deliverable: "Backup gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-3310-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Define or update RTO/RPO with business owners and document backup policy", owner: "Business Continuity Manager", dependency: "BIA available", deliverable: "RTO/RPO register, backup policy", evidenceProduced: "Policy, RTO/RPO docs" },
    { id: "rm-3310-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Deploy immutable backup solution and configure monitoring", owner: "Infrastructure Owner", dependency: "Backup policy", deliverable: "Immutable backup platform", evidenceProduced: "Platform config, monitoring alerts" },
    { id: "rm-3310-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Conduct annual recovery tests and report results", owner: "Infrastructure Owner", dependency: "Backup platform live", deliverable: "Annual recovery test reports", evidenceProduced: "Test reports with RTO/RPO results" },
    { id: "rm-3310-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 12+", activity: "Annual backup programme review and SAMA readiness pack", owner: "Infrastructure Owner", dependency: "12 months operation", deliverable: "Annual review, SAMA pack", evidenceProduced: "Review report" },
  ],

  commonGaps: [
    "Backups are taken daily but recovery has never been formally tested with documented results",
    "RTO and RPO are undefined – banks claim fast recovery without any formal target or test basis",
    "Backups are stored on the same network segment as production – ransomware can reach them",
    "Backup success is monitored by the storage team but failures are not reported to management",
    "Recovery runbooks exist for some systems but are incomplete or out of date for others",
  ],
  relatedControls: ["3.3.4", "3.3.8", "3.2.1"],
};
