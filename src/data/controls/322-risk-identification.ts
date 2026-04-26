import type { Control } from "@/types";

export const control322: Control = {
  id: "ctrl-322",
  controlNumber: "3.2.2",
  title: "Risk Identification and Analysis",
  domain: "IT Risk Management",
  domainId: "dom-32",
  subdomain: "IT Risk Management Framework",
  subdomainId: "sub-321",
  priority: "P1",
  targetMaturity: 4,
  currentMaturity: 2,
  implementationStatus: "In Progress",
  evidenceReadiness: "Partial",
  primaryOwner: "IT Risk Manager",
  supportingStakeholders: ["CISO", "Enterprise Architect", "IT Operations Head", "Application Owner", "Infrastructure Owner"],

  plainEnglishInterpretation:
    "The bank must have a systematic process to identify IT risks from all relevant sources (technology failures, cyber threats, third parties, projects, regulatory changes) and analyse them using a consistent methodology that produces comparable risk scores. The IT risk register must be comprehensive, current, and actionable.",
  samaIntent:
    "SAMA needs to see that risk identification is proactive, structured, and covers all material IT risk sources – not just the obvious ones. Banks that only identify risks after incidents occur are fundamentally reactive, which SAMA considers a maturity failure.",
  whyItMatters:
    "You cannot manage what you cannot see. Systematic risk identification ensures the bank's risk register reflects reality, enabling prioritised treatment, informed governance decisions, and defensible evidence before SAMA.",
  riskIfNotImplemented:
    "Blind spots in the risk landscape, surprise incidents that were foreseeable, inability to prioritise IT investment in risk reduction, and a risk register that does not match the bank's actual risk profile during SAMA review.",

  requiredCapabilities: [
    { id: "cap-322-1", name: "IT Risk Identification Methodology", description: "A documented methodology for identifying IT risks covering all source categories: internal, external, technology, human, and regulatory.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "Workshop facilitation tools"], targetMaturity: 3, dependencies: ["IT risk framework"] },
    { id: "cap-322-2", name: "IT Risk Scoring Model", description: "A consistent risk scoring model (likelihood × impact) with defined scales, calibrated to the bank's risk appetite thresholds.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "Excel risk model"], targetMaturity: 4, dependencies: ["IT risk appetite", "Risk identification methodology"] },
    { id: "cap-322-3", name: "IT Risk Register", description: "A live, structured risk register capturing all identified IT risks with owner, score, treatment, and review date.", owner: "IT Risk Manager", relatedTools: ["GRC tool", "SharePoint"], targetMaturity: 4, dependencies: ["Risk identification methodology", "Risk scoring model"] },
  ],

  actions: [
    { id: "act-322-p1", category: "People", title: "Train Risk Identifiers Across IT", description: "Train all IT domain heads and project managers on the risk identification methodology to enable distributed, bottom-up risk identification.", owner: "IT Risk Manager", stakeholders: ["IT Domain Heads", "PMO"], priority: "P1", effort: "3 weeks", dependency: "Methodology defined", evidenceProduced: "Training records, methodology guide" },
    { id: "act-322-pr1", category: "Process", title: "Implement Quarterly Risk Identification Workshops", description: "Run structured quarterly risk workshops across all IT domains to surface new and emerging risks using threat libraries, scenario analysis, and lessons learned.", owner: "IT Risk Manager", stakeholders: ["IT Domain Heads", "CISO", "Enterprise Architect"], priority: "P1", effort: "Quarterly", dependency: "Methodology defined", evidenceProduced: "Workshop outputs, updated risk register" },
    { id: "act-322-pr2", category: "Process", title: "Define Risk Scoring Scales and Criteria", description: "Document the likelihood and impact rating scales with clear, agreed criteria so that risks can be scored consistently across IT domains.", owner: "IT Risk Manager", stakeholders: ["CIO", "Internal Audit"], priority: "P1", effort: "3 weeks", dependency: "Risk framework", evidenceProduced: "Risk scoring guide" },
    { id: "act-322-t1", category: "Technology", title: "Configure IT Risk Register in GRC Tool", description: "Configure the GRC tool to maintain the IT risk register with automated scoring, ownership assignment, review reminders, and risk trend tracking.", owner: "IT Risk Manager", stakeholders: ["IT Governance Head"], priority: "P2", effort: "6 weeks", dependency: "GRC tool procured", evidenceProduced: "Risk register in GRC tool" },
    { id: "act-322-t2", category: "Technology", title: "Integrate Threat Intelligence into Risk Identification", description: "Subscribe to relevant threat intelligence feeds and integrate them into the risk identification process to surface emerging technology threats.", owner: "CISO", stakeholders: ["IT Risk Manager"], priority: "P2", effort: "2 months", dependency: "GRC tool", evidenceProduced: "Threat intel integration records, updated risks" },
  ],

  raciMatrix: [
    { activity: "Conduct IT risk identification workshops", boardTechnologyCommittee: "I", cio: "A", cto: "C", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "C", pmo: "C", vendorManager: "C" },
    { activity: "Maintain and update IT risk register", boardTechnologyCommittee: "I", cio: "A", cto: "I", itGovernanceHead: "C", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "C", applicationOwner: "C", infrastructureOwner: "C", complianceOfficer: "I", internalAudit: "C", pmo: "I", vendorManager: "C" },
    { activity: "Score and classify IT risks", boardTechnologyCommittee: "I", cio: "A", cto: "I", itGovernanceHead: "I", itRiskManager: "R", ciso: "C", enterpriseArchitect: "C", itOperationsHead: "I", applicationOwner: "I", infrastructureOwner: "I", complianceOfficer: "I", internalAudit: "C", pmo: "I", vendorManager: "I" },
  ],

  auditQuestions: [
    { id: "aq-322-1", question: "Can you walk me through your IT risk register? How many risks do you have and what are the top 5?", whySamaMayAsk: "SAMA checks whether the risk register is genuinely maintained and whether senior management knows its content.", expectedAnswer: "We currently have [X] risks in our register. Our top 5 by residual risk score are [list them]. Each has an assigned owner, treatment plan, and target date. I can provide a full extract.", supportingEvidence: ["IT risk register", "Risk summary report", "GRC tool screenshots"] },
    { id: "aq-322-2", question: "How do you ensure risks are identified from all relevant sources, not just technology failures?", whySamaMayAsk: "SAMA tests the breadth of the risk identification process.", expectedAnswer: "Our risk identification covers technology, vendor, regulatory, project, data, cyber, and human factors. We use a structured risk taxonomy aligned to SAMA ITGF categories. Quarterly workshops cover each IT domain and use threat library scenarios to prompt identification.", supportingEvidence: ["Risk taxonomy document", "Workshop records", "Threat library"] },
    { id: "aq-322-3", question: "How frequently is your IT risk register reviewed and updated?", whySamaMayAsk: "SAMA assesses whether risk identification is ongoing or a one-time exercise.", expectedAnswer: "The risk register is reviewed monthly by the IT Risk Manager, quarterly in risk workshops, and annually in a full re-assessment. New risks are added within 5 business days of identification.", supportingEvidence: ["Risk register version history", "Workshop minutes", "Annual review records"] },
  ],

  evidenceChecklist: [
    { id: "ev-322-1", name: "IT Risk Identification Methodology Document", description: "Documented methodology for identifying IT risks covering all source categories.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-322", domain: "IT Risk Management" },
    { id: "ev-322-2", name: "IT Risk Register (Current)", description: "Live risk register showing all current IT risks with scores, owners, and treatment status.", type: "Record", owner: "IT Risk Manager", updateFrequency: "Monthly", maturityLevelSupported: 3, status: "Partial", controlId: "ctrl-322", domain: "IT Risk Management" },
    { id: "ev-322-3", name: "Risk Scoring Criteria Document", description: "Document defining likelihood and impact scales and scoring criteria.", type: "Document", owner: "IT Risk Manager", updateFrequency: "Annual", maturityLevelSupported: 3, status: "Missing", controlId: "ctrl-322", domain: "IT Risk Management" },
    { id: "ev-322-4", name: "Risk Identification Workshop Records", description: "Records from quarterly risk identification workshops including outputs and attendance.", type: "Record", owner: "IT Risk Manager", updateFrequency: "Quarterly", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-322", domain: "IT Risk Management" },
    { id: "ev-322-5", name: "Threat Intelligence Subscription Evidence", description: "Evidence of threat intelligence subscriptions and their integration into the risk process.", type: "Record", owner: "CISO", updateFrequency: "Ongoing", maturityLevelSupported: 4, status: "Missing", controlId: "ctrl-322", domain: "IT Risk Management" },
  ],

  maturityGuidance: [
    { level: 1, label: "Initial", description: "Risks are identified reactively, often after incidents. No formal methodology or register.", documentationExpected: [], operatingEvidenceExpected: [], gapsToClose: ["Define risk taxonomy", "Create basic register", "Assign risk owners"] },
    { level: 2, label: "Developing", description: "Risk register exists but is built on individual knowledge. No consistent scoring methodology.", documentationExpected: ["Basic risk register"], operatingEvidenceExpected: [], gapsToClose: ["Define scoring model", "Implement workshops", "Broaden identification scope"] },
    { level: 3, label: "Defined", description: "Structured risk identification process using consistent methodology. Risk register is maintained quarterly. Scoring is standardised.", documentationExpected: ["Methodology document", "Risk register", "Scoring criteria"], operatingEvidenceExpected: ["Workshop records", "Quarterly updates"], gapsToClose: ["Automate in GRC", "Integrate threat intelligence"] },
    { level: 4, label: "Managed", description: "Risk identification is data-driven, using GRC tool automation and threat intelligence. Risk register is always current. SAMA would accept this.", documentationExpected: ["All L3 + GRC configuration"], operatingEvidenceExpected: ["GRC risk register", "Threat intel records", "Workshop minutes"], gapsToClose: ["Introduce predictive risk identification analytics"] },
    { level: 5, label: "Optimised", description: "Risk identification is proactive and uses AI-assisted pattern analysis, continuous monitoring, and external benchmarking.", documentationExpected: ["All L4 + analytics reports"], operatingEvidenceExpected: ["AI risk alerts", "Continuous monitoring logs"], gapsToClose: [] },
  ],

  roadmap: [
    { id: "rm-322-1", phase: 1, phaseLabel: "Mobilise & Assess", timeline: "Month 1", activity: "Review current risk register and identification process against SAMA expectations", owner: "IT Risk Manager", dependency: "None", deliverable: "Gap assessment", evidenceProduced: "Assessment report" },
    { id: "rm-322-2", phase: 2, phaseLabel: "Design", timeline: "Month 1–2", activity: "Develop risk identification methodology and scoring model", owner: "IT Risk Manager", dependency: "Gap assessment", deliverable: "Methodology and scoring documents", evidenceProduced: "Methodology guide" },
    { id: "rm-322-3", phase: 3, phaseLabel: "Implement", timeline: "Month 2–3", activity: "Run first comprehensive risk identification workshop across all IT domains", owner: "IT Risk Manager", dependency: "Methodology ready", deliverable: "Updated risk register", evidenceProduced: "Workshop records, risk register" },
    { id: "rm-322-4", phase: 3, phaseLabel: "Implement", timeline: "Month 3–5", activity: "Configure risk register in GRC tool", owner: "IT Risk Manager", dependency: "GRC tool available", deliverable: "GRC risk module", evidenceProduced: "GRC configuration, risk register" },
    { id: "rm-322-5", phase: 4, phaseLabel: "Operate & Evidence", timeline: "Month 5+", activity: "Run quarterly workshops and monthly register reviews", owner: "IT Risk Manager", dependency: "GRC live", deliverable: "Quarterly updated risk register", evidenceProduced: "Workshop records, register extracts" },
  ],

  commonGaps: [
    "Risk register only covers technology infrastructure risks – application, data, and vendor risks are missing",
    "Risk scoring is qualitative and inconsistent – different assessors score the same risk differently",
    "New project risks are not added to the central register – they are only tracked in project documents",
    "Threat intelligence is not used to inform risk identification – risks are identified from memory only",
    "Risk register is updated annually at best – not reflecting the dynamic risk environment",
  ],
  relatedControls: ["3.2.1", "3.2.3", "3.2.4"],
};
