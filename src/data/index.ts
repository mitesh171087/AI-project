// ============================================================
// SAMA ITGF Compliance Advisor – Central Data Export
// Future: Replace with API calls to backend / database
// ============================================================

import { control311 } from "./controls/311-it-governance";
import { control312 } from "./controls/312-it-strategy";
import { control313 } from "./controls/313-it-budgeting";
import { control314 } from "./controls/314-it-policy";
import { control315 } from "./controls/315-roles-responsibilities";
import { control316 } from "./controls/316-regulatory-compliance";
import { control321 } from "./controls/321-managing-it-risks";
import { control322 } from "./controls/322-risk-identification";
import { control323 } from "./controls/323-risk-treatment";
import { control324 } from "./controls/324-risk-reporting";
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
import { control341 } from "./controls/341-change-governance";
import { control342 } from "./controls/342-change-requirement";
import { control343 } from "./controls/343-system-development";
import { control344 } from "./controls/344-system-acquisition";
import { control345 } from "./controls/345-testing";
import { control346 } from "./controls/346-change-security";
import { control347 } from "./controls/347-release-management";
import { control348 } from "./controls/348-it-project-management";
import { control349 } from "./controls/349-patch-management";
import { control351 } from "./controls/351-it-workforce-planning";
import { control352 } from "./controls/352-it-training-awareness";
import { control353 } from "./controls/353-it-performance-management";
import { control361 } from "./controls/361-vendor-risk-management";
import { control362 } from "./controls/362-third-party-contracts";
import { control363 } from "./controls/363-cloud-outsourcing";
import type { Control, Domain, Subdomain, EvidenceItem } from "@/types";

// ─────────────────────────────────────────────
// All controls
// ─────────────────────────────────────────────
export const allControls: Control[] = [
  // Domain 3.1 – IT Governance
  control311,
  control312,
  control313,
  control314,
  control315,
  control316,
  // Domain 3.2 – IT Risk Management
  control321,
  control322,
  control323,
  control324,
  // Domain 3.3 – IT Operations
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
  // Domain 3.4 – IT Project & Change Management
  control341,
  control342,
  control343,
  control344,
  control345,
  control346,
  control347,
  control348,
  control349,
  // Domain 3.5 – IT Human Capital
  control351,
  control352,
  control353,
  // Domain 3.6 – Third Party Management
  control361,
  control362,
  control363,
];

export const getControlById = (id: string): Control | undefined =>
  allControls.find((c) => c.id === id);

export const getControlByNumber = (num: string): Control | undefined =>
  allControls.find((c) => c.controlNumber === num);

// ─────────────────────────────────────────────
// Domains & Subdomains
// ─────────────────────────────────────────────
export const domains: Domain[] = [
  {
    id: "dom-31",
    name: "IT Governance",
    description: "Establishes the governance structures, strategies, policies, roles, budgeting, and regulatory compliance obligations for IT management across the bank.",
    subdomains: [
      {
        id: "sub-311",
        domainId: "dom-31",
        name: "IT Governance Framework",
        description: "Core governance framework components including governance structure, strategy, budgeting, policies, roles, and regulatory compliance.",
        controls: ["ctrl-311", "ctrl-312", "ctrl-313", "ctrl-314", "ctrl-315", "ctrl-316"],
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
    description: "Governs the operational management of IT services including service management, asset management, configuration, availability, incidents, continuity, and security monitoring.",
    subdomains: [
      {
        id: "sub-331",
        domainId: "dom-33",
        name: "IT Service Management",
        description: "Service management framework, asset management, configuration management, service levels, and problem management.",
        controls: ["ctrl-331", "ctrl-332", "ctrl-333", "ctrl-335", "ctrl-337"],
      },
      {
        id: "sub-334",
        domainId: "dom-33",
        name: "IT Operations Management",
        description: "Operational management of IT systems including availability, capacity, continuity, incident, event monitoring, and backup management.",
        controls: ["ctrl-334", "ctrl-336", "ctrl-338", "ctrl-339", "ctrl-3310"],
      },
    ],
  },
  {
    id: "dom-34",
    name: "IT Project & Change Management",
    description: "Governs how IT changes and projects are planned, approved, developed, acquired, tested, released, and managed.",
    subdomains: [
      {
        id: "sub-341",
        domainId: "dom-34",
        name: "IT Change Management",
        description: "End-to-end governance of IT changes from governance framework through to patch management, including SDLC, acquisition, and project management.",
        controls: ["ctrl-341", "ctrl-342", "ctrl-343", "ctrl-344", "ctrl-345", "ctrl-346", "ctrl-347", "ctrl-348", "ctrl-349"],
      },
    ],
  },
  {
    id: "dom-35",
    name: "IT Human Capital",
    description: "Governs IT workforce planning, training and awareness, and performance management to ensure the bank has the skilled and accountable IT staff needed to meet its technology obligations.",
    subdomains: [
      {
        id: "sub-351",
        domainId: "dom-35",
        name: "IT Human Capital Management",
        description: "IT workforce planning, training, security awareness, and performance management.",
        controls: ["ctrl-351", "ctrl-352", "ctrl-353"],
      },
    ],
  },
  {
    id: "dom-36",
    name: "Third Party Management",
    description: "Governs the risk management, contractual governance, and oversight of all third-party IT vendors, service providers, and cloud arrangements.",
    subdomains: [
      {
        id: "sub-361",
        domainId: "dom-36",
        name: "Third Party Governance",
        description: "Vendor risk management, contract standards, and cloud and outsourcing governance.",
        controls: ["ctrl-361", "ctrl-362", "ctrl-363"],
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
