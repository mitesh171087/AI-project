// ============================================================
// SAMA ITGF Compliance Advisor – Core TypeScript Data Model
// Future: replace seed data imports with API/database calls
// ============================================================

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;
export type Priority = "P1" | "P2" | "P3";
export type Criticality = "Critical" | "High" | "Medium" | "Low" | "Not Applicable";
export type ImplementationStatus =
  | "Not Started"
  | "In Progress"
  | "Implemented"
  | "Needs Review";
export type EvidenceStatus = "Missing" | "Partial" | "Available" | "Verified";
export type ActionCategory = "People" | "Process" | "Technology";
export type EvidenceType =
  | "Document"
  | "Policy"
  | "Record"
  | "Report"
  | "Minutes"
  | "Log"
  | "Screenshot"
  | "Certificate";
export type RaciRole =
  | "R"
  | "A"
  | "C"
  | "I"
  | "-"
  | "R/A"
  | "A/C"
  | "R/C"
  | "C/I";

// ─────────────────────────────────────────────
// Capability
// ─────────────────────────────────────────────
export interface Capability {
  id: string;
  name: string;
  description: string;
  owner: string;
  relatedTools: string[];
  targetMaturity: MaturityLevel;
  dependencies: string[];
}

// ─────────────────────────────────────────────
// Action (People / Process / Technology)
// ─────────────────────────────────────────────
export interface Action {
  id: string;
  category: ActionCategory;
  title: string;
  description: string;
  owner: string;
  stakeholders: string[];
  priority: Priority;
  effort: string; // e.g. "2 weeks", "1 month"
  dependency: string;
  evidenceProduced: string;
}

// ─────────────────────────────────────────────
// RACI Matrix Row
// ─────────────────────────────────────────────
export interface RaciItem {
  activity: string;
  boardTechnologyCommittee: RaciRole;
  cio: RaciRole;
  cto: RaciRole;
  itGovernanceHead: RaciRole;
  itRiskManager: RaciRole;
  ciso: RaciRole;
  enterpriseArchitect: RaciRole;
  itOperationsHead: RaciRole;
  applicationOwner: RaciRole;
  infrastructureOwner: RaciRole;
  complianceOfficer: RaciRole;
  internalAudit: RaciRole;
  pmo: RaciRole;
  vendorManager: RaciRole;
}

// ─────────────────────────────────────────────
// Audit Question
// ─────────────────────────────────────────────
export interface AuditQuestion {
  id: string;
  question: string;
  whySamaMayAsk: string;
  expectedAnswer: string;
  supportingEvidence: string[];
}

// ─────────────────────────────────────────────
// Evidence Item
// ─────────────────────────────────────────────
export interface EvidenceItem {
  id: string;
  name: string;
  description: string;
  type: EvidenceType;
  owner: string;
  updateFrequency: string;
  maturityLevelSupported: MaturityLevel;
  status: EvidenceStatus;
  documentUrl?: string;
  controlId?: string;
  domain?: string;
}

// ─────────────────────────────────────────────
// Maturity Guidance per Level
// ─────────────────────────────────────────────
export interface MaturityGuidance {
  level: MaturityLevel;
  label: string;
  description: string;
  documentationExpected: string[];
  operatingEvidenceExpected: string[];
  gapsToClose: string[];
}

// ─────────────────────────────────────────────
// Roadmap Item
// ─────────────────────────────────────────────
export interface RoadmapItem {
  id: string;
  phase: 1 | 2 | 3 | 4 | 5;
  phaseLabel: string;
  timeline: string;
  activity: string;
  owner: string;
  dependency: string;
  deliverable: string;
  evidenceProduced: string;
}

// ─────────────────────────────────────────────
// Control (core entity)
// ─────────────────────────────────────────────
export interface Control {
  id: string;
  controlNumber: string;
  title: string;
  domain: string;
  domainId: string;
  subdomain: string;
  subdomainId: string;
  priority: Priority;
  targetMaturity: MaturityLevel;
  currentMaturity: MaturityLevel;
  implementationStatus: ImplementationStatus;
  evidenceReadiness: EvidenceStatus;
  primaryOwner: string;
  supportingStakeholders: string[];

  // Tab 1 – Overview
  plainEnglishInterpretation: string;
  samaIntent: string;
  whyItMatters: string;
  riskIfNotImplemented: string;

  // Tab 2 – Required Capabilities
  requiredCapabilities: Capability[];

  // Tab 3 – Actions
  actions: Action[];

  // Tab 4 – RACI
  raciMatrix: RaciItem[];

  // Tab 5 – Audit Questions
  auditQuestions: AuditQuestion[];

  // Tab 6 – Evidence Checklist
  evidenceChecklist: EvidenceItem[];

  // Tab 7 – Maturity Guidance
  maturityGuidance: MaturityGuidance[];

  // Tab 8 – Roadmap
  roadmap: RoadmapItem[];

  // Additional metadata
  commonGaps: string[];
  relatedControls: string[];
}

// ─────────────────────────────────────────────
// Subdomain
// ─────────────────────────────────────────────
export interface Subdomain {
  id: string;
  domainId: string;
  name: string;
  description: string;
  controls: string[]; // control IDs
}

// ─────────────────────────────────────────────
// Domain
// ─────────────────────────────────────────────
export interface Domain {
  id: string;
  name: string;
  description: string;
  subdomains: Subdomain[];
}

// ─────────────────────────────────────────────
// Audit Trail Entry (appended on every save)
// ─────────────────────────────────────────────
export interface AuditTrailEntry {
  id: string;
  timestamp: string; // ISO string
  note: string;
  changes: Record<string, { from: string; to: string }>;
}

// ─────────────────────────────────────────────
// Control Content + Assessment Overrides (localStorage)
// ─────────────────────────────────────────────
export interface ControlOverride {
  // Criticality (configurable classification)
  criticality?: Criticality;

  // Content overrides (framework page editing)
  plainEnglishInterpretation?: string;
  samaIntent?: string;
  whyItMatters?: string;
  riskIfNotImplemented?: string;
  evidenceChecklist?: EvidenceItem[];
  auditQuestions?: AuditQuestion[];
  commonGaps?: string[];

  // Assessment data (saved from assessment page)
  currentMaturity?: MaturityLevel;
  targetMaturity?: MaturityLevel;
  implementationStatus?: ImplementationStatus;
  evidenceReadiness?: EvidenceStatus;
  owner?: string;
  keyGaps?: string;
  remediationAction?: string;
  targetDate?: string;

  // Audit trail (one entry per save)
  auditTrail?: AuditTrailEntry[];

  // Roadmap completion tracking (itemId → completed)
  roadmapCompletions?: Record<string, boolean>;
}

export type AllOverrides = Record<string, ControlOverride>;

// ─────────────────────────────────────────────
// Assessment State (local state, future: DB)
// ─────────────────────────────────────────────
export interface AssessmentRecord {
  controlId: string;
  currentMaturity: MaturityLevel;
  targetMaturity: MaturityLevel;
  implementationStatus: ImplementationStatus;
  evidenceReadiness: EvidenceStatus;
  keyGaps: string;
  remediationAction: string;
  owner: string;
  targetDate: string;
  lastUpdated: string;
}

// ─────────────────────────────────────────────
// Dashboard Summary Stats
// ─────────────────────────────────────────────
export interface DashboardStats {
  totalDomains: number;
  totalSubdomains: number;
  totalControls: number;
  byPriority: Record<Priority, number>;
  byStatus: Record<ImplementationStatus, number>;
  byEvidenceReadiness: Record<EvidenceStatus, number>;
  byOwner: Record<string, number>;
  averageMaturity: number;
}
