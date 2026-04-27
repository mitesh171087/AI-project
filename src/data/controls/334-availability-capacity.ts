import type { Control } from "@/types";

export const control334: Control = {
  id: "ctrl-334",
  controlNumber: "3.3.4",
  title: "IT Availability and Capacity Management",
  domain: "Operations Management",
  domainId: "dom-33",
  subdomain: "Operations Management",
  subdomainId: "sub-334",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 3,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Operations Head",
  supportingStakeholders: ["CIO", "Infrastructure Owner", "Application Owner", "IT Risk Manager", "Business Continuity Manager"],

  plainEnglishInterpretation:
    "The bank must ensure that IT systems deliver the availability levels required by banking operations and customer SLAs. Capacity must be planned ahead, not reacted to. Both availability and capacity must be formally measured, reported, and managed through documented processes.",
  samaIntent:
    "SAMA requires Saudi banks to maintain the IT availability and capacity needed to support continuous banking services. System outages, slow performance, or capacity constraints that affect customers are viewed by SAMA as failures of IT governance and operational management.",
  whyItMatters:
    "Banking customers expect 24/7 service availability. Core banking, payment, and digital banking systems must be available at agreed levels. Capacity shortfalls lead to performance degradation, transaction failures, and customer impact, all of which carry regulatory and reputational consequences.",
  riskIfNotImplemented:
    "System outages, payment failures, customer complaints, regulatory enforcement, and inability to support business growth due to capacity constraints.",

  requiredCapabilities: [
    { id: "cap-334-1", name: "Availability Management Process", description: "A formal process for defining, measuring, reporting, and managing IT availability against agreed SLAs.", owner: "IT Operations Head", relatedTools: ["Nagios", "Dynatrace", "ServiceNow ITSM"], targetMaturity: 3, dependencies: ["SLA definitions", "Monitoring infrastructure"] },
    { id: "cap-334-2", name: "Capacity Planning Process", description: "A proactive process for forecasting, planning, and provisioning IT capacity to meet current and future demand.", owner: "Infrastructure Owner", relatedTools: ["Capacity planning tools", "Cloud management platforms", "APM tools"], targetMaturity: 4, dependencies: ["Business growth projections", "Monitoring data"] },
    { id: "cap-334-3", name: "Availability and Capacity Dashboard", description: "A real-time dashboard showing current availability metrics, SLA performance, capacity utilisation, and trend analysis.", owner: "IT Operations Head", relatedTools: ["Dynatrace", "Grafana", "ServiceNow"], targetMaturity: 4, dependencies: ["Monitoring infrastructure", "Availability process"] },
  ],

  actions: [
    { id: "act-334-pr1", category: "Process", title: "Define IT Availability SLAs", description: "Work with business owners to define formal availability SLAs for all critical IT systems (core banking, payments, digital channels) and document in service agreements.", owner: "IT Operations Head", stakeholders: ["Business Unit Heads", "Application Owners"], priority: "P1", effort: "4 weeks", dependency: "Business requirements", evidenceProduced: "SLA documents" },
    { id: "act-334-pr2", category: "Process", title: "Implement Capacity Planning Cycle", description: "Establish a quarterly capacity planning cycle that reviews current utilisation trends, projects 12-month demand, and initiates procurement or provisioning actions as needed.", owner: "Infrastructure Owner", stakeholders: ["CIO", "IT Operations Head", "Finance"], priority: "P1", effort: "4 weeks", dependency: "Monitoring infrastructure", evidenceProduced: "Quarterly capacity plans" },
    { id: "act-334-p1", category: "People", title: "Train Capacity Managers", description: "Train infrastructure and application owners on capacity planning methodology, forecasting techniques, and capacity management tools.", owner: "IT Operations Head", stakeholders: ["Infrastructure Owner", "Application Owner"], priority: "P2", effort: "2 weeks", dependency: "Capacity process defined", evidenceProduced: "Training records" },
    { id: "act-334-t1", category: "Technology", title: "Deploy End-to-End Monitoring Platform", description: "Implement a comprehensive monitoring platform covering infrastructure, middleware, application, and network layers with automated alerting for availability breaches.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head", "Application Owner"], priority: "P1", effort: "3 months", dependency: "Infrastructure inventory", evidenceProduced: "Monitoring platform configuration, alert rules" },
    { id: "act-334-t2", category: "Technology", title: "Implement Capacity Trend Reporting", description: "Configure capacity trend reports covering CPU, memory, storage, and network utilisation with 90-day forecasting and threshold alerting.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head"], priority: "P2", effort: "6 weeks", dependency: "Monitoring platform", evidenceProduced: "Capacity trend reports" },
  ],

  raciMatrix: [
    { activity: "Define and manage IT availability SLAs", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "C", ciso: "I", enterpriseArchitect: "C", itOperationsHead: "R", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Conduct quarterly capacity planning", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "I", itRiskManager: "I", ciso: "I", enterpriseArchitect: "C", itOperationsHead: "R", applicationOwner: "C", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Report availability performance to management", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "I", enterpriseArchitect: "I", itOperationsHead: "R", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-334-1", question: "What was your availability for core banking and payment systems in the last 12 months? Do you track this against SLAs?", whySamaMayAsk: "SAMA directly assesses operational performance as a proxy for IT management maturity.", expectedAnswer: "Our core banking system achieved [X]% availability in the last 12 months against a 99.95% SLA. We track availability monthly and report to the IT Operations Committee. I can provide the last 12 months of SLA reports.", supportingEvidence: ["Monthly availability reports", "SLA performance records", "IT Operations Committee minutes"] },
    { id: "aq-334-2", question: "How do you identify and address capacity constraints before they cause system failures?", whySamaMayAsk: "SAMA tests whether capacity management is proactive or reactive.", expectedAnswer: "We run quarterly capacity reviews for all critical systems. We monitor utilisation continuously with automated alerts at 70% and 85% thresholds. When a threshold is reached, a capacity project is automatically initiated with the infrastructure team.", supportingEvidence: ["Capacity planning records", "Monitoring alert configuration", "Capacity project records"] },
    { id: "aq-334-3", question: "What was your most significant availability incident in the last 12 months? How was it managed?", whySamaMayAsk: "SAMA uses incident handling as evidence of operational maturity.", expectedAnswer: "Our most significant incident was [describe]. We invoked the incident management process, achieved a [X] minute resolution time, conducted a post-incident review, and implemented [specific] preventive actions. The incident report and PIR are available.", supportingEvidence: ["Incident record", "Post-incident review", "Preventive action evidence"] },
  ],

  evidenceChecklist: [
    { id: "ev-334-1", name: "IT Availability SLA Documents", description: "Formal SLA documents for critical IT systems showing agreed availability targets.", type: "Document", owner: "IT Operations Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-334", domain: "Operations Management" },
    { id: "ev-334-2", name: "Monthly Availability Reports (Last 12 Months)", description: "Monthly availability performance reports showing actual vs SLA performance.", type: "Report", owner: "IT Operations Head", updateFrequency: "Monthly", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-334", domain: "Operations Management" },
    { id: "ev-334-3", name: "Quarterly Capacity Plans", description: "Quarterly capacity plans showing utilisation trends and provisioning actions.", type: "Report", owner: "Infrastructure Owner", updateFrequency: "Quarterly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-334", domain: "Operations Management" },
    { id: "ev-334-4", name: "Monitoring Platform Configuration", description: "Documentation and screenshots showing the monitoring platform configuration and alert thresholds.", type: "Screenshot", owner: "Infrastructure Owner", updateFrequency: "As required", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-334", domain: "Operations Management" },
    { id: "ev-334-5", name: "Capacity Trend Reports", description: "Quarterly reports showing capacity utilisation trends and forecasts for all critical systems.", type: "Report", owner: "Infrastructure Owner", updateFrequency: "Quarterly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-334", domain: "Operations Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Availability is measured only after failures. No SLAs or capacity planning.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define SLAs", "Implement basic monitoring", "Assign capacity owner"] },
    { level: 2, label: "Developing", description: "Basic monitoring in place. Some SLAs defined. Capacity is managed reactively.", documentationExpected: ["Draft SLAs"], operatingEvidenceExpected: ["Basic monitoring data"], gapsToClose: ["Formalise SLA reporting", "Implement capacity planning cycle", "Automate alerts"] },
    { level: 3, label: "Defined", description: "Formal SLAs, monthly availability reporting, and quarterly capacity planning are established.", documentationExpected: ["SLA documents", "Availability reports"], operatingEvidenceExpected: ["Monthly reports", "Capacity plans"], gapsToClose: ["Implement predictive capacity planning", "Build management dashboard"] },
    { level: 4, label: "Managed", description: "Availability and capacity are managed quantitatively with real-time dashboards, automated alerts, and proactive capacity procurement. SAMA would accept this.", documentationExpected: ["All L3 + capacity trend reports"], operatingEvidenceExpected: ["Dashboard screenshots", "Alert records", "Capacity approval records"], gapsToClose: ["Introduce AI-based capacity forecasting"] },
    { level: 5, label: "Optimised", description: "Capacity is managed dynamically using cloud elasticity and AI-driven demand forecasting. Availability is measured at business-impact level.", documentationExpected: ["All L4 + AI models"], operatingEvidenceExpected: ["Automated scaling records", "Business impact metrics"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-334-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Assess current availability and capacity management maturity", owner: "IT Operations Head", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-334-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Define availability SLAs and capacity planning methodology", owner: "IT Operations Head", dependency: "Business requirements", deliverable: "SLA documents, capacity methodology", evidenceProduced: "SLA docs" },
    { id: "rm-334-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Deploy monitoring platform and configure availability dashboards", owner: "Infrastructure Owner", dependency: "Monitoring tool selected", deliverable: "Monitoring platform", evidenceProduced: "Monitoring configuration, alerts" },
    { id: "rm-334-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Run quarterly capacity planning and monthly availability reporting", owner: "IT Operations Head", dependency: "Monitoring live", deliverable: "Monthly/quarterly reports", evidenceProduced: "SLA reports, capacity plans" },
    { id: "rm-334-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 12+", activity: "Annual SLA review and capacity model optimisation", owner: "IT Operations Head", dependency: "12 months operation", deliverable: "Updated SLAs and capacity plan", evidenceProduced: "Review records, updated docs" },
  ],

  commonGaps: [
    "SLAs are defined but never formally reported against – management does not know actual availability performance",
    "Capacity planning is done when systems are already running at high utilisation – reactive not proactive",
    "Monitoring covers infrastructure only – application performance and end-user experience are not measured",
    "No formal capacity approval process – capacity procurement is driven by immediate need without forward planning",
    "SLA breaches are not formally recorded or escalated – they are resolved operationally with no governance visibility",
  ],
  relatedControls: ["3.3.8", "3.3.10", "3.2.1"],
};
