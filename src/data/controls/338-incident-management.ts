import type { Control } from "@/types";

export const control338: Control = {
  id: "ctrl-338",
  controlNumber: "3.3.8",
  title: "IT Incident Management",
  domain: "Operations Management",
  domainId: "dom-33",
  subdomain: "Operations Management",
  subdomainId: "sub-338",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 3,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Operations Head",
  supportingStakeholders: ["CISO", "Application Owner", "Infrastructure Owner", "Business Continuity Manager", "Compliance Officer"],

  plainEnglishInterpretation:
    "The bank must have a formal IT incident management process that enables rapid detection, classification, response, and resolution of IT incidents. Incidents must be recorded, escalated appropriately, and reviewed post-resolution to prevent recurrence. SAMA must be notified of material incidents within defined timeframes.",
  samaIntent:
    "SAMA requires that Saudi banks can respond to IT incidents in a controlled, documented manner. SAMA particularly focuses on: (1) speed of detection and response, (2) communication to customers and regulators, (3) post-incident learning, and (4) evidence that major incidents trigger governance review.",
  whyItMatters:
    "IT incidents are inevitable. The quality of incident management determines whether an incident becomes a minor disruption or a major failure. Banks with poor incident management face extended outages, customer harm, and SAMA enforcement.",
  riskIfNotImplemented:
    "Extended outages, poor customer communication, regulatory notification failures, repeated incidents due to no root cause analysis, and SAMA findings of inadequate operational resilience.",

  requiredCapabilities: [
    { id: "cap-338-1", name: "IT Incident Management Process", description: "A documented end-to-end incident management process covering detection, logging, classification, escalation, resolution, and closure.", owner: "IT Operations Head", relatedTools: ["ServiceNow ITSM", "JIRA Service Management"], targetMaturity: 3, dependencies: ["ITSM tool", "Monitoring platform"] },
    { id: "cap-338-2", name: "Incident Classification and Escalation Matrix", description: "A formal matrix defining incident severity levels, classification criteria, response time targets, and escalation pathways for each severity.", owner: "IT Operations Head", relatedTools: ["ServiceNow", "Communication tools"], targetMaturity: 3, dependencies: ["Incident management process"] },
    { id: "cap-338-3", name: "Post-Incident Review (PIR) Process", description: "A mandatory process for conducting root cause analysis and post-incident reviews for P1 and P2 incidents, producing actionable remediation plans.", owner: "IT Operations Head", relatedTools: ["ServiceNow", "Confluence"], targetMaturity: 4, dependencies: ["Incident management process"] },
  ],

  actions: [
    { id: "act-338-pr1", category: "Process", title: "Develop Incident Management Policy and Procedure", description: "Document the IT incident management lifecycle from detection to closure, including SAMA notification requirements for material incidents.", owner: "IT Operations Head", stakeholders: ["CISO", "Compliance Officer", "Application Owners"], priority: "P1", effort: "4 weeks", dependency: "ITSM tool available", evidenceProduced: "Incident management policy and procedure" },
    { id: "act-338-pr2", category: "Process", title: "Define Incident Classification and Escalation Matrix", description: "Create a formal severity classification matrix (P1–P4) with response time SLAs, escalation paths, and communication requirements for each severity level.", owner: "IT Operations Head", stakeholders: ["CISO", "Business Continuity Manager", "Compliance Officer"], priority: "P1", effort: "2 weeks", dependency: "Incident policy", evidenceProduced: "Escalation matrix document" },
    { id: "act-338-p1", category: "People", title: "Train Incident Response Team", description: "Train all IT operations staff on the incident management procedure, classification criteria, escalation pathways, and ITSM tool usage.", owner: "IT Operations Head", stakeholders: ["HR", "ITSM administrators"], priority: "P1", effort: "3 weeks", dependency: "Incident procedure defined", evidenceProduced: "Training completion records" },
    { id: "act-338-pr3", category: "Process", title: "Implement Mandatory PIR Process for P1/P2 Incidents", description: "Make post-incident reviews mandatory for all P1 and P2 incidents, with RCA completion within 5 business days and remediation plan within 10 business days.", owner: "IT Operations Head", stakeholders: ["IT Domain Heads", "IT Risk Manager"], priority: "P1", effort: "2 weeks", dependency: "Incident procedure", evidenceProduced: "PIR records, RCA reports" },
    { id: "act-338-t1", category: "Technology", title: "Configure ITSM Incident Management Module", description: "Configure the ITSM tool to support the full incident lifecycle with automated routing, SLA tracking, escalation triggers, and reporting dashboards.", owner: "IT Operations Head", stakeholders: ["Infrastructure Owner"], priority: "P1", effort: "6 weeks", dependency: "ITSM tool", evidenceProduced: "ITSM configuration, SLA dashboard" },
  ],

  raciMatrix: [
    { activity: "Detect, log and classify IT incidents", boardTechnologyCommittee: "I", cio: "I", cto: "I", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "R", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Manage P1 incident response and resolution", boardTechnologyCommittee: "I", cio: "A", cto: "R", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "R", applicationOwner: "R", infrastructureOwner: "R", complianceOfficer: "C", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Conduct post-incident review and RCA", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "R", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "C", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-338-1", question: "How many P1 incidents did you have in the last 12 months? What were the average detection and resolution times?", whySamaMayAsk: "SAMA uses incident metrics as evidence of operational maturity.", expectedAnswer: "We had [X] P1 incidents in the last 12 months. Average detection time was [X] minutes and average resolution time was [X] hours. All are recorded in our ITSM tool and I can provide the full report.", supportingEvidence: ["ITSM incident reports", "SLA performance reports", "P1 incident records"] },
    { id: "aq-338-2", question: "Can you show me your incident classification matrix and demonstrate how a recent P1 incident was handled?", whySamaMayAsk: "SAMA tests whether the incident management process works in practice, not just on paper.", expectedAnswer: "Here is our incident classification matrix. For our last P1 incident [describe], the service desk detected it via monitoring at [time], classified it P1 at [time], escalated to the on-call manager within [X] minutes, and achieved resolution at [time]. The full timeline is in the incident record.", supportingEvidence: ["Escalation matrix", "ITSM incident record", "Communication logs"] },
    { id: "aq-338-3", question: "What is your SAMA notification process for material IT incidents?", whySamaMayAsk: "SAMA checks whether regulatory notification obligations are embedded in the incident process.", expectedAnswer: "Our incident management procedure includes a specific step for assessing SAMA notification requirements. Any P1 incident affecting customer services or regulatory systems is reviewed by the Compliance Officer within [X] hours. SAMA is notified via [channel] within the required timeframe.", supportingEvidence: ["Incident management procedure", "SAMA notification logs", "Compliance sign-off records"] },
  ],

  evidenceChecklist: [
    { id: "ev-338-1", name: "Incident Management Policy and Procedure", description: "Documented incident management process from detection to closure including SAMA notification requirements.", type: "Policy", owner: "IT Operations Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-338", domain: "Operations Management" },
    { id: "ev-338-2", name: "Incident Classification and Escalation Matrix", description: "Severity levels, classification criteria, response SLAs, and escalation pathways.", type: "Document", owner: "IT Operations Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-338", domain: "Operations Management" },
    { id: "ev-338-3", name: "ITSM Incident Records (Last 12 Months)", description: "Extract from ITSM tool showing all P1 and P2 incidents with classification, timeline, and resolution.", type: "Record", owner: "IT Operations Head", updateFrequency: "Ongoing", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-338", domain: "Operations Management" },
    { id: "ev-338-4", name: "Post-Incident Review Reports", description: "PIR reports for all P1 and P2 incidents including RCA and remediation actions.", type: "Report", owner: "IT Operations Head", updateFrequency: "Per incident", maturityLevelSupported: 4, status: "Partial", controlId: "ctrl-338", domain: "Operations Management" },
    { id: "ev-338-5", name: "SAMA Incident Notification Records", description: "Records of SAMA notifications for material incidents including notification letter and SAMA acknowledgement.", type: "Record", owner: "Compliance Officer", updateFrequency: "As required", maturityLevelSupported: 4, status: "Available", controlId: "ctrl-338", domain: "Operations Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Incidents are handled ad hoc. No formal process, ITSM tool, or escalation pathway.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Implement ITSM tool", "Define incident process", "Train staff"] },
    { level: 2, label: "Developing", description: "Basic incident logging in ITSM. Classification is inconsistent. PIRs are rare.", documentationExpected: ["Basic incident procedure"], operatingEvidenceExpected: ["ITSM records"], gapsToClose: ["Formalise classification matrix", "Mandate PIRs", "Define SLAs"] },
    { level: 3, label: "Defined", description: "Formal incident process, classification matrix, SLAs, and SAMA notification requirements defined and trained.", documentationExpected: ["Policy", "Classification matrix", "ITSM configuration"], operatingEvidenceExpected: ["ITSM records", "SLA reports", "PIR records"], gapsToClose: ["Automate escalation alerts", "Implement trend reporting"] },
    { level: 4, label: "Managed", description: "Incident management is data-driven with SLA performance tracking, trend analysis, and mandatory PIRs. SAMA notification is embedded. SAMA would accept this.", documentationExpected: ["All L3 + trend reports"], operatingEvidenceExpected: ["SLA dashboard", "PIR reports", "Trend analysis"], gapsToClose: ["Introduce proactive incident prevention using analytics"] },
    { level: 5, label: "Optimised", description: "Incident prevention is proactive using AI-driven anomaly detection. Incident rates are declining year-on-year due to systemic improvement.", documentationExpected: ["All L4 + AI configuration"], operatingEvidenceExpected: ["Incident trend reduction data", "AI alert records"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-338-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current incident management process against SAMA expectations", owner: "IT Operations Head", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-338-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop incident management policy, procedure, and classification matrix", owner: "IT Operations Head", dependency: "Gap assessment", deliverable: "Policy, procedure, matrix", evidenceProduced: "Policy documents" },
    { id: "rm-338-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–3", activity: "Configure ITSM incident module and train staff", owner: "IT Operations Head", dependency: "Policy defined", deliverable: "Configured ITSM, trained staff", evidenceProduced: "ITSM config, training records" },
    { id: "rm-338-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 3+", activity: "Operate incident management and collect PIR evidence", owner: "IT Operations Head", dependency: "Process live", deliverable: "Monthly incident reports, PIRs", evidenceProduced: "ITSM reports, PIR records" },
    { id: "rm-338-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Conduct incident management effectiveness review", owner: "IT Operations Head", dependency: "6 months operation", deliverable: "Effectiveness review report", evidenceProduced: "Review report, SAMA readiness pack" },
  ],

  commonGaps: [
    "Incidents are logged in ITSM but classification is inconsistent – P1 and P2 use the same response process",
    "PIRs are conducted for major incidents but the reports are not formally approved or tracked for action completion",
    "SAMA notification requirements are not embedded in the incident process – compliance is checked manually after the fact",
    "Incident SLA performance is not reported to management or the Board – only visible to the operations team",
    "Chronic incidents (recurring same-cause failures) are not tracked or escalated for systemic resolution",
  ],
  relatedControls: ["3.3.4", "3.3.10", "3.2.1", "3.4.1"],
};
