import type { Control } from "@/types";

export const control346: Control = {
  id: "ctrl-346",
  controlNumber: "3.4.6",
  title: "Change Security Requirements",
  domain: "IT Project & Change Management",
  domainId: "dom-34",
  subdomain: "IT Change Management",
  subdomainId: "sub-341",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "Not Started",
  evidenceReadiness: "Missing",
  primaryOwner: "CISO",
  supportingStakeholders: ["IT Governance Head", "CTO", "Enterprise Architect", "Application Owner", "PMO"],

  plainEnglishInterpretation:
    "All IT changes must include a formal security assessment to identify and address security requirements. Security must be built into the change process from requirement definition through to release. No change should be promoted to production with unresolved security findings above an agreed threshold.",
  samaIntent:
    "SAMA increasingly views information security as integral to IT change governance. Banks that address security only after implementation (or not at all) are considered immature. SAMA expects security to be embedded in the change lifecycle, not bolted on after the fact.",
  whyItMatters:
    "Changes to IT systems are a primary vector for introducing security vulnerabilities. Embedding security requirements in the change process – and validating them through testing – is the most effective way to prevent security incidents caused by changes.",
  riskIfNotImplemented:
    "Security vulnerabilities introduced through changes, regulatory censure for inadequate security governance, failed SAMA security assessments, and customer data exposure.",

  requiredCapabilities: [
    { id: "cap-346-1", name: "Change Security Assessment Process", description: "A mandatory process for assessing the security implications of each IT change before implementation.", owner: "CISO", relatedTools: ["Security assessment templates", "GRC tool"], targetMaturity: 3, dependencies: ["Change management policy", "Security policy"] },
    { id: "cap-346-2", name: "Security Requirements Library", description: "A library of standard security requirements applicable to different change types (web application, API, infrastructure, database).", owner: "CISO", relatedTools: ["Confluence", "SharePoint", "OWASP ASVS"], targetMaturity: 4, dependencies: ["Security policy", "Architecture standards"] },
    { id: "cap-346-3", name: "Security Approval Gate", description: "A mandatory security sign-off gate in the change workflow that blocks production promotion unless security requirements are met.", owner: "CISO", relatedTools: ["ITSM", "CI/CD pipeline"], targetMaturity: 4, dependencies: ["ITSM change workflow", "Security testing"] },
  ],

  actions: [
    { id: "act-346-pr1", category: "Process", title: "Define Change Security Assessment Requirements", description: "Document the security assessment requirements for each change type and create a security assessment template integrated with the change requirement template.", owner: "CISO", stakeholders: ["IT Governance Head", "Enterprise Architect"], priority: "P1", effort: "4 weeks", dependency: "Change management policy", evidenceProduced: "Change security assessment requirements document" },
    { id: "act-346-pr2", category: "Process", title: "Build Security Requirements Library", description: "Create a library of standard security requirements by change category (web app, API, DB, infra) aligned to SAMA cybersecurity framework and OWASP standards.", owner: "CISO", stakeholders: ["Enterprise Architect", "Application Owners"], priority: "P1", effort: "6 weeks", dependency: "Security framework", evidenceProduced: "Security requirements library" },
    { id: "act-346-t1", category: "Technology", title: "Implement Security Gate in ITSM Change Workflow", description: "Configure the ITSM system so that all Normal changes require a security sign-off before the CAB review step can proceed.", owner: "CISO", stakeholders: ["IT Governance Head", "ITSM administrators"], priority: "P1", effort: "3 weeks", dependency: "ITSM configuration", evidenceProduced: "ITSM workflow configuration showing security gate" },
    { id: "act-346-p1", category: "People", title: "Train Development Teams on Secure Change Practices", description: "Deliver security training to development and change teams on secure coding, OWASP top 10, and the bank's security requirements for changes.", owner: "CISO", stakeholders: ["CTO", "Application Owners"], priority: "P1", effort: "1 month", dependency: "Security requirements library", evidenceProduced: "Training records" },
    { id: "act-346-t2", category: "Technology", title: "Integrate SAST into Code Review Process", description: "Require SAST scanning output as part of the code review process, making it impossible to merge code without a clean security scan.", owner: "CISO", stakeholders: ["CTO", "Application Owners"], priority: "P1", effort: "2 months", dependency: "CI/CD pipeline", evidenceProduced: "SAST integration configuration, scan reports" },
  ],

  raciMatrix: [
    { activity: "Define change security requirements", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "R", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "C", internalAudit: "I", pmo: "I", vendorManager: "I" },
    { activity: "Conduct security assessment for each change", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "R", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "C", infrastructureOwner: "I", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
    { activity: "Approve/reject changes based on security findings", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "R", enterpriseArchitect: "I", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "I", internalAudit: "I", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-346-1", question: "How do you ensure security requirements are captured and validated for IT changes?", whySamaMayAsk: "SAMA assesses whether security is embedded in the change lifecycle.", expectedAnswer: "Every Normal change requires a security assessment sign-off by the CISO or delegate before CAB review. We have a security requirements library linked to change types. SAST scanning is mandatory for all code changes.", supportingEvidence: ["Security assessment records", "ITSM workflow configuration", "SAST reports"] },
    { id: "aq-346-2", question: "What happens when a change has a High security finding? Can it still go live?", whySamaMayAsk: "SAMA tests the enforcement of security gates.", expectedAnswer: "No change with a High or Critical unresolved security finding can be promoted to production. The CISO must formally document the finding and either the finding must be remediated before go-live, or the change must be escalated to the CIO for a formal risk acceptance decision.", supportingEvidence: ["ITSM security gate configuration", "Risk acceptance records", "Security finding remediation evidence"] },
    { id: "aq-346-3", question: "Do your vendors comply with your security change requirements?", whySamaMayAsk: "SAMA checks whether security requirements extend to third-party changes.", expectedAnswer: "Yes – all third-party change deliverables must pass our security assessment process. Vendor contracts include security testing obligations. We conduct independent security testing of vendor-delivered changes before production promotion.", supportingEvidence: ["Vendor contracts with security clauses", "Vendor security assessment records", "Third-party change security test results"] },
  ],

  evidenceChecklist: [
    { id: "ev-346-1", name: "Change Security Assessment Requirements Document", description: "Document defining security assessment requirements by change type.", type: "Document", owner: "CISO", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-346", domain: "IT Project & Change Management" },
    { id: "ev-346-2", name: "Security Requirements Library", description: "Library of standard security requirements by change category.", type: "Document", owner: "CISO", updateFrequency: "Annual", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-346", domain: "IT Project & Change Management" },
    { id: "ev-346-3", name: "Change Security Assessment Records", description: "Completed security assessments for recent Normal changes.", type: "Record", owner: "CISO", updateFrequency: "Per change", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-346", domain: "IT Project & Change Management" },
    { id: "ev-346-4", name: "SAST and DAST Scan Reports", description: "Security scan reports for application changes showing findings and remediation status.", type: "Report", owner: "CISO", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-346", domain: "IT Project & Change Management" },
    { id: "ev-346-5", name: "Security Finding Rejection/Acceptance Records", description: "Records of changes blocked or conditionally approved due to security findings.", type: "Record", owner: "CISO", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-346", domain: "IT Project & Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Security is not considered in the change process. Changes go live without security review.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Add security to change template", "Define security reviewer", "Block changes with critical findings"] },
    { level: 2, label: "Developing", description: "Security review is conducted for some changes but not consistently. No formal requirements library.", documentationExpected: ["Basic security checklist"], operatingEvidenceExpected: [], gapsToClose: ["Formalise security assessment", "Build requirements library", "Implement security gate in ITSM"] },
    { level: 3, label: "Defined", description: "Mandatory security assessment for all Normal changes. Security gate in ITSM workflow. SAST for application changes.", documentationExpected: ["Security assessment requirements", "Requirements library"], operatingEvidenceExpected: ["Security assessment records", "SAST reports"], gapsToClose: ["Extend to vendor changes", "Implement DAST"] },
    { level: 4, label: "Managed", description: "Security is fully embedded in change lifecycle with SAST/DAST, mandatory sign-off, and findings tracked to closure. SAMA would accept this.", documentationExpected: ["All L3 + DAST reports"], operatingEvidenceExpected: ["Scan reports", "Sign-off records", "Finding closure evidence"], gapsToClose: ["Introduce automated security scoring in CAB"] },
    { level: 5, label: "Optimised", description: "Security testing is fully automated in CI/CD. Security debt is tracked and reduced continuously. Threat modelling is part of every significant change.", documentationExpected: ["All L4 + threat models"], operatingEvidenceExpected: ["Automated pipeline reports", "Security debt metrics"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-346-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current security integration in change process", owner: "CISO", dependency: "None", deliverable: "Security gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-346-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop security requirements library and assessment process", owner: "CISO", dependency: "Gap assessment", deliverable: "Security requirements library", evidenceProduced: "Requirements library" },
    { id: "rm-346-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Configure security gate in ITSM and integrate SAST into pipeline", owner: "CISO", dependency: "Library approved, ITSM ready", deliverable: "Security gate, SAST integration", evidenceProduced: "ITSM config, pipeline config" },
    { id: "rm-346-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Collect security assessment records for all Normal changes", owner: "CISO", dependency: "Gate live", deliverable: "Security assessment library", evidenceProduced: "Assessment records, SAST reports" },
    { id: "rm-346-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Annual security change process review", owner: "CISO", dependency: "6 months data", deliverable: "Security effectiveness report", evidenceProduced: "Review report" },
  ],

  commonGaps: [
    "Security review is done by the CISO team for major projects only – smaller changes bypass security assessment",
    "Vendors deliver code changes that are promoted to production without any security testing",
    "SAST tools are installed but not used consistently – developers find ways to bypass them",
    "Security findings are documented but their remediation is not tracked – findings go unresolved",
    "No formal security requirements library – security assessment quality depends on individual knowledge",
  ],
  relatedControls: ["3.4.1", "3.4.2", "3.4.5", "3.4.7"],
};
