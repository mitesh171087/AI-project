import type { Control } from "@/types";

export const control3311: Control = {
  id: "ctrl-3311",
  controlNumber: "3.3.11",
  title: "Virtualization",
  domain: "Operations Management",
  domainId: "dom-33",
  subdomain: "Operations Management",
  subdomainId: "sub-331",
  priority: "P2",
  targetMaturity: 3,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "Infrastructure Head",
  supportingStakeholders: ["CTO", "CISO", "IT Operations Head", "Enterprise Architect"],

  plainEnglishInterpretation:
    "Where the bank uses virtualisation technology (virtual machines, containers, virtual networks), it must manage the virtualisation layer with the same rigour as physical infrastructure. This includes securing the hypervisor, controlling virtual machine sprawl, monitoring virtualised environments, and ensuring virtualisation configurations are hardened and compliant.",
  samaIntent:
    "SAMA recognises that virtualisation introduces specific security and operational risks that are distinct from physical infrastructure management. Hypervisor vulnerabilities, VM sprawl, and misconfigured virtual networks can expose the bank to significant risk. SAMA expects banks to have specific controls for their virtualised environments.",
  whyItMatters:
    "Virtualisation is pervasive in modern banking IT. The hypervisor sits beneath all virtual workloads — a vulnerability at this layer can compromise all VMs simultaneously. VM sprawl creates unmanaged systems. Misconfigured virtual networks can allow lateral movement. Banks operating virtualised environments without specific controls are taking on significant risk.",
  riskIfNotImplemented:
    "Hypervisor vulnerabilities exposing all virtual workloads, VM sprawl creating unmanaged and unpatched systems, virtual network misconfigurations enabling lateral movement, inability to audit virtualised environment configurations.",

  requiredCapabilities: [
    {
      id: "cap-3311-1",
      name: "Virtualisation Security Controls",
      description: "Security hardening of hypervisors and virtualisation management platforms, access controls for virtualisation administrators, and regular security patching.",
      owner: "Infrastructure Head",
      relatedTools: ["VMware vSphere", "Microsoft Hyper-V", "KVM", "CIS Benchmarks"],
      targetMaturity: 3,
      dependencies: ["Configuration management", "Patch management process"],
    },
    {
      id: "cap-3311-2",
      name: "VM Lifecycle Management",
      description: "Formal process for requesting, provisioning, and decommissioning virtual machines to prevent VM sprawl and ensure all VMs are tracked and managed.",
      owner: "Infrastructure Head",
      relatedTools: ["VMware vCenter", "ServiceNow", "Terraform"],
      targetMaturity: 3,
      dependencies: ["Asset inventory", "Change management process"],
    },
    {
      id: "cap-3311-3",
      name: "Virtualisation Monitoring",
      description: "Monitoring of virtual infrastructure performance, capacity, and security events including hypervisor logs and VM activity.",
      owner: "IT Operations Head",
      relatedTools: ["vROps", "Zabbix", "Prometheus", "Splunk"],
      targetMaturity: 3,
      dependencies: ["Monitoring infrastructure", "SOC capability"],
    },
  ],

  actions: [
    {
      id: "act-3311-pr1",
      category: "Process",
      title: "Define Virtualisation Security Policy",
      description: "Document security requirements for the virtualisation environment including hypervisor hardening, access controls, VM lifecycle, and monitoring requirements.",
      owner: "CISO",
      stakeholders: ["Infrastructure Head", "CTO"],
      priority: "P1",
      effort: "4 weeks",
      dependency: "None",
      evidenceProduced: "Virtualisation Security Policy",
    },
    {
      id: "act-3311-t1",
      category: "Technology",
      title: "Harden Virtualisation Platform",
      description: "Apply CIS Benchmark hardening to all hypervisors and virtualisation management systems. Restrict access to virtualisation management to named administrators.",
      owner: "Infrastructure Head",
      stakeholders: ["CISO"],
      priority: "P1",
      effort: "6 weeks",
      dependency: "Security policy defined",
      evidenceProduced: "Hardening configuration, access control evidence",
    },
  ],

  raciMatrix: [
    {
      activity: "Manage and secure virtualisation environment",
      boardTechnologyCommittee: "I",
      cio: "A",
      cto: "C",
      itGovernanceHead: "I",
      itRiskManager: "C",
      ciso: "C",
      enterpriseArchitect: "C",
      itOperationsHead: "C",
      applicationOwner: "I",
      infrastructureOwner: "R",
      complianceOfficer: "I",
      internalAudit: "I",
      pmo: "I",
      vendorManager: "I",
    },
  ],

  auditQuestions: [
    {
      id: "aq-3311-1",
      question: "How does the bank manage security in its virtualised environment, particularly the hypervisor layer?",
      whySamaMayAsk: "SAMA wants to verify that the bank has specific controls for its virtualisation environment, not just general infrastructure controls.",
      expectedAnswer: "Our hypervisors are hardened against CIS Benchmarks and are patched on the same cycle as physical servers. Virtualisation management access is restricted to a small number of named administrators with privileged access controls. We monitor hypervisor and VM activity and include virtualisation in our vulnerability management programme.",
      supportingEvidence: ["Virtualisation Security Policy", "Hypervisor hardening evidence", "Access control configuration", "Patch records for hypervisors"],
    },
    {
      id: "aq-3311-2",
      question: "How does the bank prevent VM sprawl and ensure all virtual machines are known and managed?",
      whySamaMayAsk: "SAMA is concerned about unmanaged systems created through VM sprawl becoming security risks.",
      expectedAnswer: "All VM provisioning requires formal approval and goes through our standard change process. VMs are registered in the asset inventory automatically upon creation. Decommissioning is also a formal process. Regular audits compare the virtualisation platform inventory against the asset register to detect unauthorised VMs.",
      supportingEvidence: ["VM provisioning procedure", "Asset register with VMs", "VM audit reports", "Decommission records"],
    },
  ],

  evidenceChecklist: [
    {
      id: "ev-3311-1",
      name: "Virtualisation Security Policy",
      description: "Policy defining security requirements for the virtualisation environment.",
      type: "Policy",
      owner: "CISO",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Missing",
      controlId: "ctrl-3311",
      domain: "Operations Management",
    },
    {
      id: "ev-3311-2",
      name: "Hypervisor Hardening Evidence",
      description: "Evidence that hypervisors are configured against hardening standards.",
      type: "Document",
      owner: "Infrastructure Head",
      updateFrequency: "Annual",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-3311",
      domain: "Operations Management",
    },
    {
      id: "ev-3311-3",
      name: "VM Inventory",
      description: "Current inventory of all virtual machines with ownership and purpose.",
      type: "Document",
      owner: "Infrastructure Head",
      updateFrequency: "Continuous",
      maturityLevelSupported: 3,
      status: "Partial",
      controlId: "ctrl-3311",
      domain: "Operations Management",
    },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "No specific virtualisation controls. VMs are created informally and the hypervisor is not hardened.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define virtualisation security policy", "Harden hypervisors"] },
    { level: 2, label: "Developing", description: "Basic virtualisation management in place but security hardening and formal lifecycle controls are incomplete.", documentationExpected: ["Draft virtualisation policy"], operatingEvidenceExpected: ["Partial hardening evidence"], gapsToClose: ["Complete hardening", "Implement VM lifecycle process"] },
    { level: 3, label: "Defined", description: "Virtualisation policy in place. Hypervisors hardened. VM lifecycle formally managed. Monitoring in place. SAMA expects at least this level.", documentationExpected: ["Virtualisation Security Policy", "VM lifecycle procedure"], operatingEvidenceExpected: ["Hardening evidence", "VM inventory", "Monitoring reports"], gapsToClose: ["Container security controls", "Privileged access management for vAdmin"] },
    { level: 4, label: "Managed", description: "Virtualisation management automated. Container environments controlled. Privileged access fully managed.", documentationExpected: ["All Level 3 docs", "Container security policy"], operatingEvidenceExpected: ["PAM evidence", "Container scan results"], gapsToClose: ["Cloud-native virtualisation security"] },
    { level: 5, label: "Optimised", description: "Fully automated virtualisation security with continuous assurance and immutable infrastructure.", documentationExpected: ["All Level 4 docs"], operatingEvidenceExpected: ["Automated compliance dashboards"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-3311-1", phase: 1, phaseLabel: "Assess", timeline: "Month 1", activity: "Assess current virtualisation environment and security gaps", owner: "Infrastructure Head", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-3311-2", phase: 2, phaseLabel: "Design", timeline: "Month 2", activity: "Define virtualisation security policy and hardening standards", owner: "CISO", dependency: "Assessment", deliverable: "Policy and standards", evidenceProduced: "Policy document" },
    { id: "rm-3311-3", phase: 3, phaseLabel: "Implement", timeline: "Month 3–5", activity: "Apply hypervisor hardening and implement VM lifecycle process", owner: "Infrastructure Head", dependency: "Standards defined", deliverable: "Hardened environment", evidenceProduced: "Hardening evidence and VM inventory" },
  ],

  commonGaps: [
    "Hypervisors are not hardened against CIS Benchmarks or equivalent standards",
    "VM sprawl — large numbers of VMs exist with no owner, unclear purpose, and no patching",
    "Virtualisation administrator access is over-privileged and not adequately controlled",
    "No specific monitoring of the virtualisation layer — hypervisor logs are not reviewed",
    "Virtual network configurations have not been reviewed for security — flat virtual networking increases blast radius",
  ],
  relatedControls: ["3.3.1", "3.3.5", "3.3.6", "3.4.9"],
};
