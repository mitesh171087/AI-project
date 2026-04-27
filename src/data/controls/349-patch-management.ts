import type { Control } from "@/types";

export const control349: Control = {
  id: "ctrl-349",
  controlNumber: "3.4.9",
  title: "Patch Management",
  domain: "System Change Management",
  domainId: "dom-34",
  subdomain: "System Change Management",
  subdomainId: "sub-341",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "Infrastructure Owner",
  supportingStakeholders: ["CISO", "IT Operations Head", "Application Owner", "IT Governance Head", "Vendor Manager"],

  plainEnglishInterpretation:
    "The bank must maintain a formal patch management process that identifies, evaluates, tests, and applies security and system patches to all IT assets within defined timeframes. Critical security patches must be applied on a priority basis with defined SLAs. The patch status of all systems must be visible and reported.",
  samaIntent:
    "SAMA views unpatched systems as a primary indicator of poor IT operational hygiene. During examinations, SAMA frequently requests patch status reports. Banks with high proportions of unpatched systems, especially for critical vulnerabilities, are considered operationally immature and at high cyber risk.",
  whyItMatters:
    "The majority of successful cyber attacks exploit known vulnerabilities for which patches are available but not applied. A robust patch management process is one of the highest-ROI security controls. SAMA expects patching to be systematic, measurable, and evidenced.",
  riskIfNotImplemented:
    "Exploitation of known vulnerabilities, successful cyber attacks, data breaches, regulatory enforcement, and SAMA findings during examination of unacceptably high levels of unpatched systems.",

  requiredCapabilities: [
    { id: "cap-349-1", name: "Patch Management Policy and SLAs", description: "A formal policy defining patch categories, SLAs for applying patches by severity, and exemption process.", owner: "Infrastructure Owner", relatedTools: ["Qualys", "Tenable", "Microsoft WSUS", "SCCM"], targetMaturity: 3, dependencies: ["Change management policy", "IT asset register"] },
    { id: "cap-349-2", name: "Vulnerability Scanning and Patch Identification", description: "Automated vulnerability scanning across all IT assets to identify missing patches and assess exploitability.", owner: "CISO", relatedTools: ["Qualys", "Tenable.io", "Nessus", "Microsoft Defender"], targetMaturity: 3, dependencies: ["IT asset register", "Network access"] },
    { id: "cap-349-3", name: "Patch Compliance Reporting", description: "Regular reporting on patch compliance rates by system criticality, patch age, and vulnerability severity.", owner: "Infrastructure Owner", relatedTools: ["Qualys", "SCCM", "Power BI", "GRC tool"], targetMaturity: 4, dependencies: ["Vulnerability scanning", "ITSM"] },
  ],

  actions: [
    { id: "act-349-pr1", category: "Process", title: "Develop Patch Management Policy with SLAs", description: "Create a formal patch management policy defining patch categories (Critical, High, Medium, Low), SLA timeframes for each, exemption process, and compliance reporting requirements.", owner: "Infrastructure Owner", stakeholders: ["CISO", "IT Governance Head", "Application Owners"], priority: "P1", effort: "3 weeks", dependency: "Change management policy", evidenceProduced: "Patch management policy" },
    { id: "act-349-pr2", category: "Process", title: "Implement Monthly Patching Cycle", description: "Establish a monthly patching cycle where all available patches are assessed, tested, and applied within policy SLAs, with the CAB reviewing the monthly patch release.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head", "Application Owners", "IT Governance Head"], priority: "P1", effort: "4 weeks", dependency: "Patch policy", evidenceProduced: "Monthly patch deployment records" },
    { id: "act-349-p1", category: "People", title: "Assign Patch Coordinators by Technology Domain", description: "Designate patch coordinators for each technology domain (Windows, Linux, network, database, applications) responsible for patch assessment, testing, and deployment.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head"], priority: "P1", effort: "2 weeks", dependency: "Patch policy", evidenceProduced: "Patch coordinator assignments" },
    { id: "act-349-t1", category: "Technology", title: "Deploy Automated Vulnerability Scanning Platform", description: "Deploy an automated vulnerability scanning platform (e.g., Qualys or Tenable) covering all IT assets with scheduled weekly scans and real-time dashboards.", owner: "CISO", stakeholders: ["Infrastructure Owner", "Application Owners"], priority: "P1", effort: "2 months", dependency: "IT asset register", evidenceProduced: "Scanning platform configuration, scan reports" },
    { id: "act-349-t2", category: "Technology", title: "Implement Patch Deployment Automation", description: "Deploy automated patch deployment tools (e.g., SCCM, Ansible, or cloud-native tools) to reduce manual patching effort and improve patch application speed.", owner: "Infrastructure Owner", stakeholders: ["IT Operations Head", "CISO"], priority: "P2", effort: "3 months", dependency: "Scanning platform", evidenceProduced: "Patch automation configuration, deployment logs" },
  ],

  raciMatrix: [
    { activity: "Define patch management policy and SLAs", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Identify and assess patches monthly", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "I", itRiskManager: "C", ciso: "C", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "C" },
    { activity: "Report patch compliance to management", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "R", enterpriseArchitect: "I", itOperationsHead: "C", applicationOwner: "I", infrastructureOwner: "R", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-349-1", question: "What is your current patch compliance rate for critical and high severity patches? Can you show me the data?", whySamaMayAsk: "SAMA directly checks patch compliance rates as a key operational security indicator.", expectedAnswer: "Our current patch compliance rate is [X]% for Critical patches and [X]% for High patches. Critical patches must be applied within 72 hours. The compliance rate is tracked in our vulnerability management dashboard. I can pull the current report.", supportingEvidence: ["Vulnerability scanning dashboard", "Patch compliance report", "SLA performance data"] },
    { id: "aq-349-2", question: "What is your process for applying emergency patches for zero-day vulnerabilities?", whySamaMayAsk: "SAMA tests whether emergency patching bypasses safety or has its own controlled process.", expectedAnswer: "We have a documented emergency patch process that allows us to bypass the normal CAB cycle for Critical zero-day patches. The CISO triggers the emergency patch process, the patch is tested in an accelerated cycle (8 hours), and deployed with CIO approval. Post-application review follows within 5 business days.", supportingEvidence: ["Emergency patch procedure", "CISO trigger records", "Emergency patch deployment records"] },
    { id: "aq-349-3", question: "How do you handle systems that cannot be patched due to vendor limitations or business criticality?", whySamaMayAsk: "SAMA tests whether patch exemptions are managed and compensating controls are in place.", expectedAnswer: "Systems that cannot be patched within SLA are subject to our exemption process. The application owner submits an exemption request with risk justification. The IT Risk Manager assesses compensating controls. Exemptions are approved by the CISO and reported in the monthly patch compliance report.", supportingEvidence: ["Patch exemption policy", "Exemption register", "Compensating control evidence", "CISO approval records"] },
  ],

  evidenceChecklist: [
    { id: "ev-349-1", name: "Patch Management Policy", description: "Policy defining patch categories, SLAs by severity, exemption process, and compliance reporting.", type: "Policy", owner: "Infrastructure Owner", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-349", domain: "System Change Management" },
    { id: "ev-349-2", name: "Monthly Patch Compliance Reports", description: "Monthly reports showing patch compliance rates by system and severity.", type: "Report", owner: "CISO", updateFrequency: "Monthly", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-349", domain: "System Change Management" },
    { id: "ev-349-3", name: "Vulnerability Scan Reports (Last 3 Months)", description: "Automated vulnerability scan results showing identified missing patches.", type: "Report", owner: "CISO", updateFrequency: "Weekly", maturityLevelSupported: 3, status: "Available", controlId: "ctrl-349", domain: "System Change Management" },
    { id: "ev-349-4", name: "Patch Deployment Records", description: "Records from patch deployment tool showing which patches were applied to which systems and when.", type: "Log", owner: "Infrastructure Owner", updateFrequency: "Monthly", maturityLevelSupported: 4, status: "Available", controlId: "ctrl-349", domain: "System Change Management" },
    { id: "ev-349-5", name: "Patch Exemption Register", description: "Register of approved patch exemptions with compensating controls and review dates.", type: "Record", owner: "CISO", updateFrequency: "Monthly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-349", domain: "System Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Patching is ad hoc. No policy, scanning, or tracking. Systems are patched only when problems occur.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define patching SLAs", "Implement vulnerability scanning", "Create patch register"] },
    { level: 2, label: "Developing", description: "Manual patching of critical systems. No automated scanning. Compliance not tracked.", documentationExpected: ["Basic patch procedure"], operatingEvidenceExpected: ["Some patch records"], gapsToClose: ["Deploy vulnerability scanning", "Define compliance targets", "Report to management"] },
    { level: 3, label: "Defined", description: "Automated scanning, defined SLAs, monthly patching cycle, and compliance reporting in place.", documentationExpected: ["Patch policy", "SLA targets", "Scan configuration"], operatingEvidenceExpected: ["Monthly compliance reports", "Scan reports", "Deployment records"], gapsToClose: ["Automate patch deployment", "Implement exemption process"] },
    { level: 4, label: "Managed", description: "Automated patch deployment, real-time compliance dashboard, exemption management, and Board-level reporting. SAMA would accept this.", documentationExpected: ["All L3 + exemption register"], operatingEvidenceExpected: ["Automated deployment logs", "Dashboard screenshots", "Exemption records"], gapsToClose: ["Reduce exemption count to near-zero for Critical patches"] },
    { level: 5, label: "Optimised", description: "Patching is fully automated with zero-touch deployment for routine patches. Patch compliance is 99%+ for Critical patches. Vulnerability window is measured in hours.", documentationExpected: ["All L4 + automation design"], operatingEvidenceExpected: ["Zero-touch deployment records", "99%+ compliance data"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-349-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Conduct vulnerability assessment to baseline current patch posture", owner: "CISO", dependency: "None", deliverable: "Current patch compliance baseline", evidenceProduced: "Baseline scan report" },
    { id: "rm-349-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop patch management policy with SLAs and exemption process", owner: "Infrastructure Owner", dependency: "Baseline report", deliverable: "Patch management policy", evidenceProduced: "Policy document" },
    { id: "rm-349-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Deploy automated vulnerability scanning and patch compliance reporting", owner: "CISO", dependency: "Policy approved, scanning tool", deliverable: "Scanning platform, compliance dashboard", evidenceProduced: "Scan reports, dashboard" },
    { id: "rm-349-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Run monthly patch cycle and collect compliance evidence", owner: "Infrastructure Owner", dependency: "Process live", deliverable: "Monthly compliance reports", evidenceProduced: "Reports, deployment logs" },
    { id: "rm-349-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Annual patch management review and SAMA readiness assessment", owner: "CISO", dependency: "6 months data", deliverable: "Patch effectiveness report", evidenceProduced: "Review report, SAMA pack" },
  ],

  commonGaps: [
    "Critical vulnerability patches are taking 30+ days to apply – significantly exceeding SAMA expectations",
    "Patch compliance is tracked for servers only – network devices, databases, and applications are not covered",
    "No formal exemption process – unpatched systems are left unpatched indefinitely without management approval",
    "Patch compliance report is produced but never reviewed by management or the Board",
    "Third-party and vendor-managed systems are excluded from the patch compliance tracking",
  ],
  relatedControls: ["3.4.1", "3.4.6", "3.4.7", "3.2.1", "3.3.8"],
};
