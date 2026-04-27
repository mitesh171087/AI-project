import type { Control } from "@/types";

export const control332: Control = {
  id: "ctrl-332",
  controlNumber: "3.3.2",
  title: "Interdependencies",
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
  supportingStakeholders: ["Enterprise Architect", "CTO", "CISO", "Application Owners", "Infrastructure Head", "BCP Manager"],

  plainEnglishInterpretation:
    "The bank must identify and document the interdependencies between its IT systems, services, and third-party providers. This means understanding which systems depend on which — so that when one component fails or changes, the bank knows exactly what else will be affected.",
  samaIntent:
    "SAMA requires banks to understand the full chain of dependencies across their technology landscape. Without this, impact assessments for incidents, changes, and BCP scenarios are unreliable. SAMA inspectors will look for evidence that the bank can demonstrate awareness of critical system interdependencies and that these are used in risk and continuity planning.",
  whyItMatters:
    "Technology failures rarely affect a single isolated system. Applications depend on databases, which depend on infrastructure, which depends on network, which may depend on third-party connectivity. Undocumented interdependencies lead to surprise outages, failed change implementations, and incomplete BCP arrangements.",
  riskIfNotImplemented:
    "Unexpected cascading failures when systems are changed or fail, incomplete BCP scenarios that miss dependent services, poor impact analysis for incidents and changes, inability to isolate critical systems during cyber incidents.",

  requiredCapabilities: [
    {
      id: "cap-332-1",
      name: "Interdependency Mapping",
      description: "Documented maps of critical IT system interdependencies including application-to-application, application-to-infrastructure, and third-party dependency relationships.",
      owner: "Enterprise Architect",
      relatedTools: ["ServiceNow CMDB", "Dynatrace", "AppDynamics", "Lucidchart"],
      targetMaturity: 3,
      dependencies: ["IT asset inventory", "Application registry"],
    },
    {
      id: "cap-332-2",
      name: "CMDB with Relationship Data",
      description: "Configuration Management Database that records not just assets but the relationships and dependencies between configuration items.",
      owner: "IT Operations Head",
      relatedTools: ["ServiceNow CMDB", "iTop", "BMC Helix"],
      targetMaturity: 3,
      dependencies: ["Asset inventory", "Automated discovery"],
    },
    {
      id: "cap-332-3",
      name: "Third-Party Dependency Register",
      description: "Register of external service providers and their IT services on which the bank depends, with criticality ratings.",
      owner: "IT Operations Head",
      relatedTools: ["ServiceNow", "Excel", "Vendor management system"],
      targetMaturity: 3,
      dependencies: ["Vendor management process"],
    },
  ],

  actions: [
    {
      id: "act-332-pr1",
      category: "Process",
      title: "Define Interdependency Mapping Process",
      description: "Establish a process for identifying, documenting, and maintaining interdependency maps for critical IT systems, including updates when systems change.",
      owner: "Enterprise Architect",
      stakeholders: ["IT Operations Head", "Application Owners", "BCP Manager"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "None",
      evidenceProduced: "Interdependency mapping procedure",
    },
    {
      id: "act-332-t1",
      category: "Technology",
      title: "Populate CMDB with Relationship Data",
      description: "Extend the CMDB to capture relationships between configuration items, prioritising critical production systems.",
      owner: "IT Operations Head",
      stakeholders: ["Enterprise Architect", "Application Owners"],
      priority: "P1",
      effort: "3 months",
      dependency: "CMDB tooling in place",
      evidenceProduced: "CMDB relationship maps, interdependency diagrams",
    },
  ],

  raciMatrix: [
    {
      activity: "Maintain system interdependency maps",
      boardTechnologyCommittee: "I",
      cio: "A",
      cto: "R",
      itGovernanceHead: "I",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "R",
      itOperationsHead: "C",
      applicationOwner: "C",
      infrastructureOwner: "C",
      complianceOfficer: "I",
      internalAudit: "I",
      pmo: "I",
      vendorManager: "C",
    },
  ],

  auditQuestions: [
    {
      id: "aq-332-1",
      question: "How does the bank document and maintain awareness of interdependencies between its IT systems, services, and third parties?",
      whySamaMayAsk: "SAMA wants assurance that the bank can assess the full impact of failures, changes, and incidents across its technology environment.",
      expectedAnswer: "We maintain interdependency maps in our CMDB covering all critical systems. Maps are updated when systems change and are used for impact analysis during incident response and change management.",
      supportingEvidence: ["CMDB relationship records", "Interdependency diagrams", "Impact analysis examples from incident records"],
    },
    {
      id: "aq-332-2",
      question: "How are interdependencies used in your BCP and disaster recovery planning?",
      whySamaMayAsk: "SAMA needs to verify that BCP scenarios account for all system dependencies, not just primary systems.",
      expectedAnswer: "BCP and DR scenarios are built using the interdependency maps to ensure all dependent services are included. Recovery sequences are designed based on the dependency chain.",
      supportingEvidence: ["BCP documentation", "DR test results", "Dependency-based recovery sequences"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-332-1",
      name: "System Interdependency Maps",
      description: "Documented maps showing relationships and dependencies between critical IT systems.",
      type: "Document",
      owner: "Enterprise Architect",
      updateFrequency: "Annual / on change",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-332",
      domain: "Operations Management",
    },
    {
      id: "ev-332-2",
      name: "CMDB Relationship Data",
      description: "CMDB records showing configuration item relationships and dependencies.",
      type: "Document",
      owner: "IT Operations Head",
      updateFrequency: "Continuous",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-332",
      domain: "Operations Management",
    },
    {
      id: "ev-332-3",
      name: "Third-Party Dependency Register",
      description: "Register of external service dependencies with criticality ratings.",
      type: "Document",
      owner: "IT Operations Head",
      updateFrequency: "Annual / on change",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-332",
      domain: "Operations Management",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No documented interdependencies. Impact analysis relies entirely on tribal knowledge.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Identify critical systems", "Create initial dependency maps"] },
    { level: 2, label: "Developing", description: "Some interdependencies documented informally for the most critical systems only.", documentationExpected: ["Draft dependency diagrams"], operatingEvidenceExpected: ["Informal records"], gapsToClose: ["Formalise CMDB relationships", "Cover all critical systems"] },
    { level: 3, label: "Defined", description: "Interdependency maps maintained in CMDB for all critical systems. Used in impact analysis and BCP. SAMA expects at least this level.", documentationExpected: ["Interdependency maps", "CMDB relationship records", "Third-party dependency register"], operatingEvidenceExpected: ["Impact analysis examples", "BCP scenarios using dependency maps"], gapsToClose: ["Automate discovery", "Extend to cloud and SaaS dependencies"] },
    { level: 4, label: "Managed", description: "Interdependency maps are continuously updated and used proactively in risk and change decisions.", documentationExpected: ["All Level 3 docs"], operatingEvidenceExpected: ["Change impact assessments linked to CMDB", "Risk assessment linkage"], gapsToClose: ["Real-time dependency monitoring"] },
    { level: 5, label: "Optimised", description: "Automated real-time dependency discovery with AI-assisted impact prediction.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Automated dashboards"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-332-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Identify critical systems requiring dependency mapping", owner: "Enterprise Architect", dependency: "None", deliverable: "Critical systems list", evidenceProduced: "Systems inventory" },
    { id: "rm-332-2", phase: 2, phaseLabel: "Implement", timeline: "Month 2–4", activity: "Document interdependency maps and populate CMDB with relationship data", owner: "IT Operations Head", dependency: "CMDB tooling", deliverable: "Dependency maps", evidenceProduced: "CMDB records and diagrams" },
    { id: "rm-332-3", phase: 3, phaseLabel: "Operate", timeline: "Month 4+", activity: "Integrate dependency maps into incident, change, and BCP processes", owner: "Enterprise Architect", dependency: "Maps completed", deliverable: "Updated processes", evidenceProduced: "Impact analysis examples" },
  ],

  commonGaps: [
    "No CMDB or CMDB used only for asset tracking without relationship data between configuration items",
    "Interdependencies are known informally by key technical staff but not formally documented",
    "Third-party and cloud service dependencies are not captured in any register",
    "BCP and DR scenarios do not account for full system dependency chains",
    "Dependency maps are created during a project and never maintained as systems evolve",
  ],
  relatedControls: ["3.3.1", "3.3.4", "3.3.5", "3.3.6", "3.2.1"],
};
