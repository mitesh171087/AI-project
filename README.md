# SAMA ITGF Compliance Advisor

An interactive compliance workbench helping Saudi banks understand, implement, assess, and evidence compliance against the **Saudi Arabian Monetary Authority IT Governance Framework (SAMA ITGF)**.

---

## Application Purpose

The SAMA ITGF Compliance Advisor is an enterprise-grade web application designed for:

- **CIO / CTO** – Strategic oversight of SAMA compliance posture
- **IT Governance Head** – Framework interpretation and implementation planning
- **IT Risk Manager** – Risk alignment and gap identification
- **CISO** – Security control compliance evidence
- **Compliance Officer** – Regulatory tracking and Board reporting
- **Internal Audit** – Evidence review and audit question preparation
- **Enterprise Architect** – Capability mapping and roadmap planning

The application is not a static document viewer. It behaves as an **interactive compliance workbench** where each control is fully interpreted, evidenced, assessed, and tracked.

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app redirects to `/dashboard` automatically.

### Production Build

```bash
npm run build
npm run start
```

---

## Key Features

| Feature | Description |
|---|---|
| **Dashboard** | SAMA compliance posture overview with charts, heatmap, and KPIs |
| **Framework Explorer** | Interactive browser of all SAMA ITGF domains, subdomains, and controls |
| **Control Detail Page** | 8-tab rich page per control (Overview, Capabilities, Actions, RACI, Audit Questions, Evidence, Maturity Guidance, Roadmap) |
| **Maturity Assessment** | Assess current vs. target maturity for each control with gap tracking |
| **Evidence Library** | Centralised evidence management with status tracking and CSV export |
| **RACI Library** | Cross-control accountability matrix |
| **Roadmap Generator** | Phased implementation roadmap with CSV export |
| **Global Search** | Full-text search across controls, evidence, and audit questions |
| **Admin Panel** | Seed data viewer with future database integration placeholders |

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/              # Main application layout group
│   │   ├── layout.tsx      # Sidebar + main content layout
│   │   ├── dashboard/      # /dashboard
│   │   ├── framework/      # /framework + /framework/[controlId]
│   │   ├── assessment/     # /assessment
│   │   ├── evidence/       # /evidence
│   │   ├── raci/           # /raci
│   │   ├── roadmap/        # /roadmap
│   │   ├── search/         # /search
│   │   └── admin/          # /admin
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Redirects to /dashboard
├── components/
│   ├── ui/                 # Base UI components (Button, Card, Tabs, etc.)
│   ├── layout/             # AppSidebar, AppHeader
│   ├── ControlCard.tsx     # Control summary card
│   ├── CapabilityCard.tsx  # Capability display card
│   ├── ActionTable.tsx     # People/Process/Technology actions table
│   ├── RaciMatrix.tsx      # RACI table component
│   ├── AuditQuestionAccordion.tsx
│   ├── EvidenceTable.tsx   # Evidence checklist with status editing
│   ├── RoadmapTimeline.tsx # Phased roadmap display
│   ├── MaturityBadge.tsx   # Maturity level badge
│   ├── PriorityBadge.tsx   # Priority badge
│   ├── StatusBadge.tsx     # Status and evidence badges
│   ├── SearchBar.tsx       # Search input component
│   ├── FilterPanel.tsx     # Multi-filter panel
│   └── DashboardMetricCard.tsx
├── data/
│   ├── index.ts            # Central data exports + query helpers
│   └── controls/           # One file per SAMA ITGF control
│       ├── 311-it-governance.ts
│       ├── 312-it-strategy.ts
│       ├── 314-it-policy.ts
│       ├── 315-roles-responsibilities.ts
│       ├── 316-regulatory-compliance.ts
│       ├── 321-managing-it-risks.ts
│       ├── 322-risk-identification.ts
│       ├── 323-risk-treatment.ts
│       ├── 324-risk-reporting.ts
│       ├── 334-availability-capacity.ts
│       ├── 338-incident-management.ts
│       ├── 3310-backup-recovery.ts
│       ├── 341-change-governance.ts
│       ├── 342-change-requirement.ts
│       ├── 345-testing.ts
│       ├── 346-change-security.ts
│       ├── 347-release-management.ts
│       └── 349-patch-management.ts
├── lib/
│   └── utils.ts            # Utility functions, colours, CSV export, stats
└── types/
    └── index.ts            # Full TypeScript data model
```

---

## How to Add More SAMA Controls

1. Create a new file in `src/data/controls/` following the existing naming convention (e.g., `335-problem-management.ts`)
2. Export a `Control` object conforming to the `Control` interface in `src/types/index.ts`
3. Import the new control in `src/data/index.ts` and add it to the `allControls` array
4. Update the relevant `Domain.subdomains[].controls` array to include the new control ID
5. Rebuild – the control will automatically appear in all pages

### Control Template

```typescript
import type { Control } from "@/types";

export const control335: Control = {
  id: "ctrl-335",
  controlNumber: "3.3.5",
  title: "IT Problem Management",
  domain: "IT Operations",
  domainId: "dom-33",
  subdomain: "IT Operations Management",
  subdomainId: "sub-334",
  priority: "P2",
  // ... populate all required fields
};
```

---

## How to Update Seed Data

Edit the relevant file in `src/data/controls/` directly. All content (interpretation, audit questions, evidence items, maturity guidance, roadmap) lives in these TypeScript files.

**Future enhancement:** Replace seed data with API calls to a backend database. Each data access point in `src/data/index.ts` is annotated with a comment indicating where the database call should replace the static import.

---

## SAMA ITGF Controls Included (v1.0)

| Control | Title | Priority |
|---|---|---|
| 3.1.1 | Information Technology Governance | P1 |
| 3.1.2 | Information Technology Strategy | P1 |
| 3.1.4 | IT Policy and Procedures | P1 |
| 3.1.5 | Roles and Responsibilities | P1 |
| 3.1.6 | Regulatory Compliance | P1 |
| 3.2.1 | Managing IT Risks | P1 |
| 3.2.2 | Risk Identification and Analysis | P1 |
| 3.2.3 | Risk Treatment | P1 |
| 3.2.4 | Risk Reporting, Monitoring and Profiling | P1 |
| 3.3.4 | IT Availability and Capacity Management | P1 |
| 3.3.8 | IT Incident Management | P1 |
| 3.3.10 | Data Backup and Recoverability | P1 |
| 3.4.1 | System Change Governance | P1 |
| 3.4.2 | Change Requirement Definition and Approval | P1 |
| 3.4.5 | Testing | P1 |
| 3.4.6 | Change Security Requirements | P1 |
| 3.4.7 | Change Release Management | P1 |
| 3.4.9 | Patch Management | P1 |

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | App Router, SSR/SSG |
| TypeScript | 5.x | Type safety throughout |
| Tailwind CSS | 4.x | Utility-first styling |
| Radix UI | Latest | Accessible UI primitives |
| Recharts | 3.x | Dashboard charts |
| Lucide React | Latest | Icons |

---

## Future Enhancements

The following enhancements are planned and placeholder points exist in the codebase:

- [ ] **User authentication** – Role-based access for CIO, Auditor, Compliance, Read-only roles
- [ ] **Database integration** – PostgreSQL with Prisma ORM; replace `src/data/index.ts` imports
- [ ] **Evidence upload** – Document upload to S3/Azure Blob with metadata tracking
- [ ] **AI Control Interpreter** – Claude API integration for plain-English control interpretation
- [ ] **AI Gap Remediation** – AI-generated remediation plans from assessment data
- [ ] **AI Audit Preparation** – Auto-generate SAMA audit packs from evidence and assessment
- [ ] **Export to PDF/Excel** – Generate SAMA-ready assessment packs
- [ ] **GRC Integration** – Export to RSA Archer, ServiceNow GRC, MetricStream
- [ ] **Workflow Approvals** – Evidence approval workflows with sign-off tracking
- [ ] **Collaboration** – Comments, notifications, and @mentions per control
- [ ] **Additional Controls** – Expand beyond the initial 18 Priority 1 controls to full SAMA ITGF coverage
- [ ] **Benchmarking** – Anonymous peer comparison across Saudi banking sector
- [ ] **Regulatory Watch** – Auto-ingestion of new SAMA circulars

---

## Architecture Notes

- All application state is currently managed in React local state. When connecting a database, replace the state with server actions or API calls.
- The `src/data/index.ts` file acts as the data access layer – all future database queries should be added here.
- The `AssessmentRecord` type in `src/types/index.ts` is designed to map directly to a database table.
- The `EvidenceItem.status` field is mutable in the UI (select dropdown) and persists in local state. This is the first field that should be persisted to a database.

---

## Disclaimer

This application is an advisory tool to help Saudi banks understand and prepare for SAMA ITGF compliance. It does not constitute legal, regulatory, or professional compliance advice. Always consult your compliance team and legal counsel for formal regulatory guidance.
