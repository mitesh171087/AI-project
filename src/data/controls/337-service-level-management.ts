import type { Control } from "@/types";

export const control337: Control = {
  id: "ctrl-337",
  controlNumber: "3.3.7",
  title: "Batch Processing",
  domain: "Operations Management",
  domainId: "dom-33",
  subdomain: "Operations Management",
  subdomainId: "sub-331",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Operations Head",
  supportingStakeholders: ["Application Owners", "CTO", "Business Operations", "Finance", "Compliance Officer"],

  plainEnglishInterpretation:
    "The bank must manage and control its batch processing operations — the automated, scheduled jobs that run critical banking processes such as end-of-day processing, interest calculations, report generation, and data feeds. Batch jobs must complete on time, produce complete and accurate outputs, and failures must be detected and resolved quickly.",
  samaIntent:
    "SAMA is concerned that banks maintain integrity and completeness of their financial processing. Batch processing underpins core banking operations including end-of-day reconciliation, statement generation, and regulatory reporting. SAMA expects formal controls to ensure that batch processing failures are detected, investigated, and resolved without compromising financial data integrity.",
  whyItMatters:
    "A failed or incomplete batch process can corrupt financial records, delay customer transactions, cause erroneous regulatory reports, and create significant remediation effort. Banks that cannot demonstrate reliable, controlled batch processing face reputational, operational, and regulatory risk.",
  riskIfNotImplemented:
    "Data integrity errors in financial records, delayed or missed regulatory reporting, customer-facing errors from incomplete processing, inability to detect partial failures that corrupt downstream data, SAMA regulatory sanctions.",

  requiredCapabilities: [
    {
      id: "cap-337-1",
      name: "Batch Job Schedule and Inventory",
      description: "Documented inventory of all batch jobs including schedule, dependencies, owners, and criticality classification.",
      owner: "IT Operations Head",
      relatedTools: ["IBM Workload Scheduler", "CA7", "Control-M", "Autosys"],
      targetMaturity: 3,
      dependencies: ["Job scheduling tool", "Application ownership"],
    },
    {
      id: "cap-337-2",
      name: "Batch Monitoring and Alerting",
      description: "Automated monitoring of batch job execution including completion status, duration, and output validation with alerting for failures and delays.",
      owner: "IT Operations Head",
      relatedTools: ["Control-M", "Splunk", "ServiceNow", "Custom monitoring scripts"],
      targetMaturity: 3,
      dependencies: ["Batch job inventory", "Monitoring infrastructure"],
    },
    {
      id: "cap-337-3",
      name: "Batch Failure Response Procedures",
      description: "Documented procedures for responding to batch failures including escalation paths, retry procedures, and rollback processes.",
      owner: "IT Operations Head",
      relatedTools: ["ServiceNow", "ITSM ticketing"],
      targetMaturity: 3,
      dependencies: ["Batch inventory", "On-call rota"],
    },
  ],

  actions: [
    {
      id: "act-337-pr1",
      category: "Process",
      title: "Create Batch Processing Register",
      description: "Develop and maintain a complete inventory of all batch jobs including business function, schedule, dependencies, criticality, and responsible owner.",
      owner: "IT Operations Head",
      stakeholders: ["Application Owners", "Business Operations"],
      priority: "P1",
      effort: "6 weeks",
      dependency: "None",
      evidenceProduced: "Batch Processing Register",
    },
    {
      id: "act-337-t1",
      category: "Technology",
      title: "Implement Centralised Batch Monitoring",
      description: "Deploy a centralised batch monitoring capability with automated alerting for failed, delayed, or incomplete jobs.",
      owner: "IT Operations Head",
      stakeholders: ["Application Owners", "Business Operations"],
      priority: "P1",
      effort: "3 months",
      dependency: "Batch register complete",
      evidenceProduced: "Batch monitoring dashboard, alert evidence",
    },
  ],

  raciMatrix: [
    {
      activity: "Monitor and manage daily batch processing",
      boardTechnologyCommittee: "I",
      cio: "A",
      cto: "C",
      itGovernanceHead: "I",
      itRiskManager: "C",
      ciso: "I",
      enterpriseArchitect: "I",
      itOperationsHead: "R",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "C",
      internalAudit: "I",
      pmo: "I",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-337-1",
      question: "How does the bank manage and monitor its batch processing operations, including end-of-day processing?",
      whySamaMayAsk: "SAMA is concerned about the integrity of financial processing. SAMA will want evidence that batch operations are formally controlled and monitored.",
      expectedAnswer: "All batch jobs are registered in our batch processing inventory with defined schedules, dependencies, and owners. Automated monitoring detects failures and delays in real-time and triggers alerts to the operations team. Failures are investigated and resolved through a formal process with escalation procedures.",
      supportingEvidence: ["Batch Processing Register", "Monitoring system screenshots", "Sample batch completion reports", "Incident records for batch failures"],
    },
    {
      id: "aq-337-2",
      question: "What controls are in place to ensure the completeness and accuracy of batch outputs?",
      whySamaMayAsk: "SAMA wants to verify that the bank has controls to detect and prevent data integrity issues from batch processing.",
      expectedAnswer: "Batch outputs include control totals and reconciliation checks. Critical financial batch outputs are reconciled against source data before downstream processing proceeds. Any reconciliation failures halt processing and trigger investigation.",
      supportingEvidence: ["Control total documentation", "Reconciliation procedures", "Sample reconciliation reports"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-337-1",
      name: "Batch Processing Register",
      description: "Complete inventory of all batch jobs with schedule, dependencies, criticality, and ownership.",
      type: "Document",
      owner: "IT Operations Head",
      updateFrequency: "On change",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-337",
      domain: "Operations Management",
    },
    {
      id: "ev-337-2",
      name: "Batch Monitoring Reports",
      description: "Daily/regular reports showing batch job completion status, durations, and any failures.",
      type: "Report",
      owner: "IT Operations Head",
      updateFrequency: "Daily",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-337",
      domain: "Operations Management",
    },
    {
      id: "ev-337-3",
      name: "Batch Failure Response Procedures",
      description: "Documented procedures for responding to and resolving batch processing failures.",
      type: "Policy",
      owner: "IT Operations Head",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-337",
      domain: "Operations Management",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Batch processing is managed informally. No complete inventory and failures are discovered reactively.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Create batch job inventory", "Implement basic monitoring"] },
    { level: 2, label: "Developing", description: "Most critical batch jobs are monitored but coverage is incomplete. Failure response is informal.", documentationExpected: ["Partial batch register"], operatingEvidenceExpected: ["Some monitoring evidence"], gapsToClose: ["Complete batch register", "Formalise failure response procedures"] },
    { level: 3, label: "Defined", description: "Complete batch register maintained. Automated monitoring with alerting. Formal failure response procedures. SAMA expects at least this level.", documentationExpected: ["Batch register", "Failure response procedures"], operatingEvidenceExpected: ["Monitoring reports", "Failure resolution records"], gapsToClose: ["Implement control totals", "Automate reconciliation"] },
    { level: 4, label: "Managed", description: "Batch performance metrics tracked over time. Predictive scheduling optimisation. Reconciliation automated.", documentationExpected: ["All Level 3 docs", "SLA metrics for batch"], operatingEvidenceExpected: ["Performance trend reports", "Reconciliation evidence"], gapsToClose: ["End-to-end batch orchestration"] },
    { level: 5, label: "Optimised", description: "Intelligent batch scheduling with dynamic resource allocation and self-healing capabilities.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Automation evidence"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-337-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Inventory all batch jobs and identify critical ones", owner: "IT Operations Head", dependency: "None", deliverable: "Batch job inventory", evidenceProduced: "Register document" },
    { id: "rm-337-2", phase: 2, phaseLabel: "Design", timeline: "Month 2", activity: "Define batch monitoring requirements and failure response procedures", owner: "IT Operations Head", dependency: "Inventory", deliverable: "Procedures document", evidenceProduced: "Batch failure response procedures" },
    { id: "rm-337-3", phase: 3, phaseLabel: "Implement", timeline: "Month 3–5", activity: "Deploy centralised batch monitoring and alerting", owner: "IT Operations Head", dependency: "Procedures defined", deliverable: "Monitoring capability", evidenceProduced: "Monitoring dashboard" },
  ],

  commonGaps: [
    "No complete inventory of all batch jobs — some jobs are undocumented and their purpose is unclear",
    "Batch failures are discovered reactively by business users rather than proactively by IT monitoring",
    "No formal procedures for batch failure response — responses are ad hoc and depend on individual knowledge",
    "No control totals or reconciliation checks on critical financial batch outputs",
    "Batch job ownership is unclear — no single accountable person for critical financial processing jobs",
  ],
  relatedControls: ["3.3.3", "3.3.8", "3.3.10", "3.2.1"],
};
