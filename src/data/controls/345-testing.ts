import type { Control } from "@/types";

export const control345: Control = {
  id: "ctrl-345",
  controlNumber: "3.4.5",
  title: "Testing",
  domain: "System Change Management",
  domainId: "dom-34",
  subdomain: "System Change Management",
  subdomainId: "sub-341",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Governance Head",
  supportingStakeholders: ["CTO", "Application Owner", "Enterprise Architect", "CISO", "Business Analysts", "PMO"],

  plainEnglishInterpretation:
    "All IT changes must be tested before implementation in production. Testing must be formal, documented, and cover functional, integration, performance, security, and user acceptance dimensions. Testing results must be reviewed and approved before any change is promoted to production.",
  samaIntent:
    "SAMA wants to see that banks do not introduce risk into production systems through untested changes. Formal, documented testing is a primary control preventing change-related incidents and is evidence that the bank manages production risk proactively.",
  whyItMatters:
    "Untested changes are among the most frequent causes of production outages, data corruption, and security vulnerabilities in banking systems. Testing evidence also provides SAMA with the assurance that changes work as intended before affecting customers.",
  riskIfNotImplemented:
    "Production failures, data corruption, customer impact, security vulnerabilities introduced through changes, and inability to evidence to SAMA that changes were properly tested.",

  requiredCapabilities: [
    { id: "cap-345-1", name: "Test Strategy and Plan Framework", description: "A framework requiring a formal test strategy and plan for each significant change covering all applicable test types.", owner: "IT Governance Head", relatedTools: ["JIRA", "Confluence", "Test management tools"], targetMaturity: 3, dependencies: ["Change management policy"] },
    { id: "cap-345-2", name: "Test Environment Management", description: "Dedicated test environments that mirror production for functional and performance testing without impacting live systems.", owner: "Infrastructure Owner", relatedTools: ["VMware", "Cloud environments", "Container platforms"], targetMaturity: 3, dependencies: ["Infrastructure", "Change management process"] },
    { id: "cap-345-3", name: "Security Testing Capability", description: "The capability to conduct security testing (SAST, DAST, penetration testing) as part of the change process for system changes.", owner: "CISO", relatedTools: ["Veracode", "Burp Suite", "OWASP ZAP", "Nessus"], targetMaturity: 4, dependencies: ["Security requirements", "Test environments"] },
  ],

  actions: [
    { id: "act-345-pr1", category: "Process", title: "Develop Test Management Policy and Framework", description: "Create a formal test management policy defining required test types, test environment usage, test sign-off authority, and defect management for IT changes.", owner: "IT Governance Head", stakeholders: ["CTO", "Application Owners", "CISO"], priority: "P1", effort: "4 weeks", dependency: "Change management policy", evidenceProduced: "Test management policy and framework" },
    { id: "act-345-pr2", category: "Process", title: "Mandate User Acceptance Testing (UAT) Sign-off", description: "Require formal business owner UAT sign-off for all Normal changes before production promotion. No change goes live without business confirmation that it meets requirements.", owner: "IT Governance Head", stakeholders: ["Business Unit Heads", "Application Owners"], priority: "P1", effort: "2 weeks", dependency: "Test framework", evidenceProduced: "UAT sign-off records" },
    { id: "act-345-p1", category: "People", title: "Establish Dedicated Test Manager Role", description: "Designate or hire a test manager responsible for test quality, test environment management, and ensuring test evidence is captured and retained.", owner: "CIO", stakeholders: ["CTO", "PMO"], priority: "P2", effort: "1 month", dependency: "Test framework", evidenceProduced: "Test manager role profile, appointment" },
    { id: "act-345-t1", category: "Technology", title: "Implement Test Management Tool", description: "Deploy a test management tool (e.g., JIRA with Zephyr, or Xray) to capture test plans, test scripts, test results, and defect records.", owner: "IT Governance Head", stakeholders: ["Application Owners", "CTO"], priority: "P2", effort: "2 months", dependency: "Test framework", evidenceProduced: "Test management tool with test records" },
    { id: "act-345-t2", category: "Technology", title: "Implement Security Testing in CI/CD Pipeline", description: "Integrate SAST and DAST security testing tools into the CI/CD pipeline to automatically scan code and applications before promotion.", owner: "CISO", stakeholders: ["CTO", "Application Owners"], priority: "P1", effort: "3 months", dependency: "CI/CD pipeline, security tools", evidenceProduced: "Security scan reports, pipeline configuration" },
  ],

  raciMatrix: [
    { activity: "Develop and approve test plans", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "C", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "R", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Execute functional and integration testing", boardTechnologyCommittee: "I", cio: "I", cto: "C", itGovernanceHead: "I", itRiskManager: "I", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "R", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "C" },
    { activity: "Approve test results and authorise production promotion", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "R", itRiskManager: "C", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "I", complianceOfficer: "I", internalAudit: "I", pmo: "C", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-345-1", question: "Show me the test records for a recent significant change. What tests were conducted?", whySamaMayAsk: "SAMA reviews actual test artefacts to assess testing rigour.", expectedAnswer: "Here are the test records for [change]. We conducted functional testing, integration testing, performance testing, security scanning, and UAT. All test cases are documented with pass/fail status. The test sign-off was obtained before the change was promoted to production.", supportingEvidence: ["Test plans", "Test execution records", "Test sign-off documents"] },
    { id: "aq-345-2", question: "What security testing do you conduct before deploying changes to production?", whySamaMayAsk: "SAMA is increasingly focused on secure change management.", expectedAnswer: "All application changes go through SAST before code review and DAST testing in the test environment. High-risk changes also require penetration testing. Security findings above Medium severity block promotion to production.", supportingEvidence: ["Security scan reports", "Pipeline configuration", "Security finding remediation records"] },
    { id: "aq-345-3", question: "Has the business owner formally signed off any of the changes you made in the last quarter?", whySamaMayAsk: "SAMA checks whether UAT is genuinely conducted by business users.", expectedAnswer: "Yes – all Normal changes require business owner UAT sign-off. Here are the UAT sign-off records for the last quarter showing [X] changes with documented business owner approval.", supportingEvidence: ["UAT sign-off records", "Business owner email or system approvals"] },
  ],

  evidenceChecklist: [
    { id: "ev-345-1", name: "Test Management Policy", description: "Policy defining required test types, test authority, environment usage, and defect management.", type: "Policy", owner: "IT Governance Head", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-345", domain: "System Change Management" },
    { id: "ev-345-2", name: "Test Plans for Recent Changes", description: "Sample test plans showing test scope, test types, test cases, and execution schedule.", type: "Document", owner: "Application Owner", updateFrequency: "Per change", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-345", domain: "System Change Management" },
    { id: "ev-345-3", name: "Test Execution Results", description: "Completed test execution records showing test case results, defects raised, and defect resolution.", type: "Record", owner: "Application Owner", updateFrequency: "Per change", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-345", domain: "System Change Management" },
    { id: "ev-345-4", name: "UAT Sign-off Records", description: "Business owner UAT sign-off records for Normal changes.", type: "Record", owner: "Business Unit Head", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-345", domain: "System Change Management" },
    { id: "ev-345-5", name: "Security Testing Reports", description: "SAST, DAST, and penetration test reports for application changes.", type: "Report", owner: "CISO", updateFrequency: "Per change", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-345", domain: "System Change Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Testing is informal. No documented test plans or results.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define test requirements", "Mandate test records", "Establish test environments"] },
    { level: 2, label: "Developing", description: "Basic testing is conducted but inconsistently documented. No security testing or formal UAT.", documentationExpected: ["Basic test records"], operatingEvidenceExpected: [], gapsToClose: ["Formalise test plans", "Mandate UAT sign-off", "Add security testing"] },
    { level: 3, label: "Defined", description: "Formal test management with documented plans, execution records, and UAT sign-off for all Normal changes.", documentationExpected: ["Test policy", "Test plans", "Execution records", "UAT sign-offs"], operatingEvidenceExpected: ["Test records per change"], gapsToClose: ["Implement security testing pipeline", "Automate test management"] },
    { level: 4, label: "Managed", description: "Testing is comprehensive, automated where possible, and includes security scanning. Test metrics track defect rates and test coverage. SAMA would accept this.", documentationExpected: ["All L3 + security scan reports"], operatingEvidenceExpected: ["Security scan reports", "UAT records", "Test metrics"], gapsToClose: ["Increase automated test coverage"] },
    { level: 5, label: "Optimised", description: "Testing is fully automated for regression and security. AI-assisted test generation increases coverage. Defect rates are declining continuously.", documentationExpected: ["All L4 + automation coverage"], operatingEvidenceExpected: ["Automated test results", "Coverage metrics"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-345-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review test coverage and documentation quality for recent changes", owner: "IT Governance Head", dependency: "None", deliverable: "Test gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-345-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop test management policy and standard test plan template", owner: "IT Governance Head", dependency: "Gap assessment", deliverable: "Test policy and template", evidenceProduced: "Policy document" },
    { id: "rm-345-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Implement test management tool and configure security testing pipeline", owner: "CTO", dependency: "Policy approved", deliverable: "Test tool, security pipeline", evidenceProduced: "Tool config, security scan reports" },
    { id: "rm-345-4", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 4+", activity: "Collect test records and UAT sign-offs for all changes", owner: "IT Governance Head", dependency: "Tools live", deliverable: "Test records library", evidenceProduced: "Test plans, results, UAT sign-offs" },
    { id: "rm-345-5", phase: 5, phaseLabel: "Review & Prepare", timeline: "Month 9+", activity: "Test effectiveness review and SAMA preparation", owner: "IT Governance Head", dependency: "6 months data", deliverable: "Test metrics report", evidenceProduced: "Metrics, SAMA pack" },
  ],

  commonGaps: [
    "Test plans exist but test results are not recorded – teams say they tested but have no evidence",
    "UAT is conducted informally by sending a demo to the business – no formal sign-off record exists",
    "Security testing is conducted by external penetration testers annually but not embedded in the change process",
    "Test environments are shared and not representative of production – test results are unreliable",
    "Performance testing is not conducted – changes are promoted to production without load testing",
  ],
  relatedControls: ["3.4.1", "3.4.2", "3.4.6", "3.4.7"],
};
