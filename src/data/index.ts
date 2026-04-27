// ============================================================
// SAMA ITGF Compliance Advisor – Central Data Export
// Future: Replace with API calls to backend / database
// ============================================================

// Domain 3.1 – Information Technology Governance and Leadership
import { control311 } from "./controls/311-it-governance";
import { control312 } from "./controls/312-it-strategy";
import { control313 } from "./controls/313-it-budgeting";
import { control314 } from "./controls/314-it-policy";
import { control315 } from "./controls/315-roles-responsibilities";
import { control316 } from "./controls/316-regulatory-compliance";
import { control317 } from "./controls/317-internal-it-audit";
import { control318 } from "./controls/318-staff-competence-training";
import { control319 } from "./controls/319-performance-management";
// Domain 3.2 – IT Risk Management
import { control321 } from "./controls/321-managing-it-risks";
import { control322 } from "./controls/322-risk-identification";
import { control323 } from "./controls/323-risk-treatment";
import { control324 } from "./controls/324-risk-reporting";
// Domain 3.3 – Operations Management
import { control331 } from "./controls/331-it-service-management";
import { control332 } from "./controls/332-it-asset-management";
import { control333 } from "./controls/333-configuration-management";
import { control334 } from "./controls/334-availability-capacity";
import { control335 } from "./controls/335-problem-management";
import { control336 } from "./controls/336-it-service-continuity";
import { control337 } from "./controls/337-service-level-management";
import { control338 } from "./controls/338-incident-management";
import { control339 } from "./controls/339-event-log-monitoring";
import { control3310 } from "./controls/3310-backup-recovery";
import { control3311 } from "./controls/3311-virtualization";
// Domain 3.4 – System Change Management
import { control341 } from "./controls/341-change-governance";
import { control342 } from "./controls/342-change-requirement";
import { control343 } from "./controls/343-system-development";
import { control344 } from "./controls/344-system-acquisition";
import { control345 } from "./controls/345-testing";
import { control346 } from "./controls/346-change-security";
import { control347 } from "./controls/347-release-management";
import { control348 } from "./controls/348-it-project-management";
import { control349 } from "./controls/349-patch-management";
import { control3410 } from "./controls/3410-it-project-management";
import { control3411 } from "./controls/3411-quality-assurance";
import type { Control, Domain, Subdomain, EvidenceItem } from "@/types";

// ─────────────────────────────────────────────
// All controls (35 total, matching official SAMA ITGF v1.0)
// ─────────────────────────────────────────────
export const allControls: Control[] = [
  // Domain 3.1 – Information Technology Governance and Leadership (9 controls)
  control311,
  control312,
  control313,
  control314,
  control315,
  control316,
  control317,
  control318,
  control319,
  // Domain 3.2 – IT Risk Management (4 controls)
  control321,
  control322,
  control323,
  control324,
  // Domain 3.3 – Operations Management (11 controls)
  control331,
  control332,
  control333,
  control334,
  control335,
  control336,
  control337,
  control338,
  control339,
  control3310,
  control3311,
  // Domain 3.4 – System Change Management (11 controls)
  control341,
  control342,
  control343,
  control344,
  control345,
  control346,
  control347,
  control348,
  control349,
  control3410,
  control3411,
];

export const getControlById = (id: string): Control | undefined =>
  allControls.find((c) => c.id === id);

export const getControlByNumber = (num: string): Control | undefined =>
  allControls.find((c) => c.controlNumber === num);

// ─────────────────────────────────────────────
// Domains & Subdomains (4 official SAMA ITGF domains)
// ─────────────────────────────────────────────
export const domains: Domain[] = [
  {
    id: "dom-31",
    name: "Information Technology Governance and Leadership",
    description: "Establishes the governance structures, strategies, enterprise architecture, policies, roles, audit, staff competence, and performance management for IT across the bank.",
    subdomains: [
      {
        id: "sub-311",
        domainId: "dom-31",
        name: "IT Governance and Leadership",
        description: "Core governance and leadership components including governance structure, strategy, enterprise architecture, policies, roles, regulatory compliance, internal audit, staff competence, and performance management.",
        controls: ["ctrl-311", "ctrl-312", "ctrl-313", "ctrl-314", "ctrl-315", "ctrl-316", "ctrl-317", "ctrl-318", "ctrl-319"],
      },
    ],
  },
  {
    id: "dom-32",
    name: "IT Risk Management",
    description: "Defines how IT risks are identified, assessed, treated, monitored, and reported across the bank's technology landscape.",
    subdomains: [
      {
        id: "sub-321",
        domainId: "dom-32",
        name: "IT Risk Management Framework",
        description: "The framework, methodology, and processes for managing all categories of IT risk.",
        controls: ["ctrl-321", "ctrl-322", "ctrl-323", "ctrl-324"],
      },
    ],
  },
  {
    id: "dom-33",
    name: "Operations Management",
    description: "Governs the operational management of IT services including asset management, interdependencies, service levels, availability, data center, network, batch processing, incidents, problem management, backup, and virtualisation.",
    subdomains: [
      {
        id: "sub-331",
        domainId: "dom-33",
        name: "Operations Management",
        description: "End-to-end operational management covering assets, interdependencies, SLAs, availability/capacity, data center, network, batch processing, incident management, problem management, backup, and virtualisation.",
        controls: ["ctrl-331", "ctrl-332", "ctrl-333", "ctrl-334", "ctrl-335", "ctrl-336", "ctrl-337", "ctrl-338", "ctrl-339", "ctrl-3310", "ctrl-3311"],
      },
    ],
  },
  {
    id: "dom-34",
    name: "System Change Management",
    description: "Governs how IT changes and systems are governed, acquired, developed, tested, secured, released, configured, patched, managed as projects, and quality assured.",
    subdomains: [
      {
        id: "sub-341",
        domainId: "dom-34",
        name: "System Change Management",
        description: "End-to-end governance of IT changes and system development from change governance through to quality assurance.",
        controls: ["ctrl-341", "ctrl-342", "ctrl-343", "ctrl-344", "ctrl-345", "ctrl-346", "ctrl-347", "ctrl-348", "ctrl-349", "ctrl-3410", "ctrl-3411"],
      },
    ],
  },
];

export const getDomainById = (id: string): Domain | undefined =>
  domains.find((d) => d.id === id);

export const getControlsByDomain = (domainName: string): Control[] =>
  allControls.filter((c) => c.domain === domainName);

export const getControlsBySubdomain = (subdomainId: string): Control[] => {
  const subdomain = domains
    .flatMap((d) => d.subdomains)
    .find((s) => s.id === subdomainId);
  if (!subdomain) return [];
  return allControls.filter((c) => subdomain.controls.includes(c.id));
};

// ─────────────────────────────────────────────
// Global Evidence Library
// ─────────────────────────────────────────────
export const allEvidenceItems: EvidenceItem[] = allControls.flatMap((ctrl) =>
  ctrl.evidenceChecklist.map((ev) => ({
    ...ev,
    controlId: ctrl.id,
    domain: ctrl.domain,
  }))
);

// ─────────────────────────────────────────────
// Unique owners / domains / priorities for filters
// ─────────────────────────────────────────────
export const uniqueOwners = [...new Set(allControls.map((c) => c.primaryOwner))];
export const uniqueDomains = [...new Set(allControls.map((c) => c.domain))];
export const uniquePriorities = [...new Set(allControls.map((c) => c.priority))];
export const uniqueStatuses = [...new Set(allControls.map((c) => c.implementationStatus))];
export const uniqueEvidenceStatuses = [...new Set(allControls.map((c) => c.evidenceReadiness))];
