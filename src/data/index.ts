// ============================================================
// SAMA ITGF Compliance Advisor – Central Data Export
// Future: Replace with API calls to backend / database
// ============================================================

import { control311 } from "./controls/311-it-governance";
import { control312 } from "./controls/312-it-strategy";
import { control314 } from "./controls/314-it-policy";
import { control315 } from "./controls/315-roles-responsibilities";
import { control316 } from "./controls/316-regulatory-compliance";
import { control321 } from "./controls/321-managing-it-risks";
import { control322 } from "./controls/322-risk-identification";
import { control323 } from "./controls/323-risk-treatment";
import { control324 } from "./controls/324-risk-reporting";
import { control334 } from "./controls/334-availability-capacity";
import { control338 } from "./controls/338-incident-management";
import { control3310 } from "./controls/3310-backup-recovery";
import { control341 } from "./controls/341-change-governance";
import { control342 } from "./controls/342-change-requirement";
import { control345 } from "./controls/345-testing";
import { control346 } from "./controls/346-change-security";
import { control347 } from "./controls/347-release-management";
import { control349 } from "./controls/349-patch-management";
import type { Control, Domain, Subdomain, EvidenceItem } from "@/types";

// ─────────────────────────────────────────────
// All controls
// ─────────────────────────────────────────────
export const allControls: Control[] = [
  control311,
  control312,
  control314,
  control315,
  control316,
  control321,
  control322,
  control323,
  control324,
  control334,
  control338,
  control3310,
  control341,
  control342,
  control345,
  control346,
  control347,
  control349,
];

export const getControlById = (id: string): Control | undefined =>
  allControls.find((c) => c.id === id);

export const getControlByNumber = (num: string): Control | undefined =>
  allControls.find((c) => c.controlNumber === num);

// ─────────────────────────────────────────────
// Domains & Subdomains (derived from controls)
// ─────────────────────────────────────────────
export const domains: Domain[] = [
  {
    id: "dom-31",
    name: "IT Governance",
    description: "Establishes the governance structures, strategies, policies, roles, and regulatory compliance obligations for IT management across the bank.",
    subdomains: [
      {
        id: "sub-311",
        domainId: "dom-31",
        name: "IT Governance Framework",
        description: "Core governance framework components including governance structure, strategy, policies, roles, and regulatory compliance.",
        controls: ["ctrl-311", "ctrl-312", "ctrl-314", "ctrl-315", "ctrl-316"],
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
    name: "IT Operations",
    description: "Governs the operational management of IT services including availability, incident management, and data recovery.",
    subdomains: [
      {
        id: "sub-334",
        domainId: "dom-33",
        name: "IT Operations Management",
        description: "Operational management of IT systems including availability, capacity, incident, and backup management.",
        controls: ["ctrl-334", "ctrl-338", "ctrl-3310"],
      },
    ],
  },
  {
    id: "dom-34",
    name: "IT Project & Change Management",
    description: "Governs how IT changes and projects are planned, approved, executed, tested, released, and tracked.",
    subdomains: [
      {
        id: "sub-341",
        domainId: "dom-34",
        name: "IT Change Management",
        description: "End-to-end governance of IT changes from governance framework through to patch management.",
        controls: ["ctrl-341", "ctrl-342", "ctrl-345", "ctrl-346", "ctrl-347", "ctrl-349"],
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
