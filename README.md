# Dr.Roby Clinic

Small, focused, useful, provable, repeatable, sellable clinic product.

STATUS: NEW PRODUCT
CURRENT_PHASE: UNDERSTAND → DESIGN
IMPLEMENTATION: NOT_STARTED

---

# Dr.Roby Clinic — Global Project Overview

> **A focused clinic product built around continuity, clinical responsibility, and provable architecture.**

Dr.Roby Clinic is a small, focused, useful, provable, repeatable, and sellable clinic product. It is designed for the operational reality of a clinic without trying to become a hospital system, a general-purpose EHR, or an LIMS.

The project is built by **MOHAMED.K_ROBY**, a nurse with 22 years of clinical experience, with software development and architecture carried out from a mobile environment. That origin is part of the product's strength: the model begins with real clinic work rather than abstract software assumptions.

## What makes Dr.Roby Clinic distinct

Dr.Roby Clinic does not claim to be larger than established EHR platforms. Its architectural distinction is that it makes several boundaries explicit and preserves them as contracts.

### 1. Patient continuity is not the same as visit activity

The product separates the persistent patient identity from the clinical journey, the individual encounter, and the working-day context:

```text
Patient
  → Case
      → Visit
          → Clinic Day
```

A **Patient** is the stable clinic identity. A **Case** is the patient's operational and clinical journey. A **Visit** is one organized clinical encounter. A **Clinic Day** is the working-date context in which visits are recorded.

This structure preserves a case when it continues across multiple visits or clinic days.

### 2. Visit Exit does not equal Case Completion

Dr.Roby Clinic explicitly preserves this invariant:

```text
Visit Exit ≠ Case Completion
```

Leaving the clinic ends the operational flow of the current Visit. It does not automatically complete the Case. Case Completion is a separate clinical decision owned by the Doctor.

This prevents a daily operational event from silently becoming a clinical conclusion.

### 3. Past History is separate from Clinical History

The product distinguishes two different meanings of history:

- **Past History** records information that existed before the patient entered the clinic system.
- **Clinical History** is derived from the preserved Visits recorded by the clinic.

```text
Past History ≠ Clinical History
```

Previous Visits retain their historical meaning. A later Visit does not overwrite the clinical record of an earlier Visit.

### 4. Authority is part of the domain model

The authority model is explicit:

```text
Doctor = Main Admin + Clinical Authority + System Owner
Nurse  = Delegated Operational Participant
```

Nurse delegation does not transfer clinical authority or system ownership. The Doctor retains exclusive authority to establish Case Completion and the authorized authority to close a Clinic Day.

The system therefore distinguishes operational participation from clinical decision-making instead of treating every authenticated user as an interchangeable operator.

### 5. The architecture has a proof trail

The project is governed through a controlled sequence:

```text
Understand
→ Define
→ Contract
→ Authorize
→ Build
→ Prove
→ Reconcile
→ Commit
→ Milestone
```

Architecture documents define the scope. Technical contracts define the boundaries. Authorization decisions permit bounded implementation. Proof and reconciliation records verify the result. Git commits and milestones preserve the project's time-based memory.

This process is not a claim that the product has more runtime features than mature global platforms. It is a claim about how Dr.Roby Clinic protects meaning while it is being built.

## Core domain model

| Concept | Meaning | Core boundary |
|---|---|---|
| Patient | Stable clinic identity | Remains distinct from Case and Visit identity |
| Case | One patient's operational and clinical journey | May span multiple Visits and Clinic Days |
| Visit | One organized clinical encounter | Belongs to exactly one Case and one Clinic Day |
| Clinic Day | Working-date context | Closure does not complete an open Case |
| Past History | Information from before clinic entry | Remains separate from Clinical History |
| Clinical History | History derived from recorded Visits | Visits remain the authoritative source |
| Doctor | Clinical authority and system owner | Establishes Case Completion and authorized Clinic Day closure |
| Nurse | Delegated operational participant | Does not receive clinical authority through delegation |

## Deliberate product boundary

Dr.Roby Clinic is:

- a focused clinic product;
- centered on Patients, Cases, Visits, Clinic Days, and clinical history;
- designed for clear operational and clinical boundaries;
- independently contracted from other factory products.

Dr.Roby Clinic is **not**:

- an LIMS;
- a hospital information system;
- a general-purpose EHR replacement;
- a pharmacy system;
- a billing or ERP system;
- an AI diagnosis system;
- a multi-branch or multi-tenant platform by implication.

The project's experience with other products may inform engineering practice, but it does not authorize copying another product's domain or architecture.

## Architecture and evidence

The architecture is documented under [`ARCHITECTURE/`](./ARCHITECTURE/). The most important evidence records are:

- [Domain Specification](./ARCHITECTURE/DEFINE/DR-ROBY-CLINIC-DOMAIN-SPECIFICATION.md)
- [Domain / Business Model Implementation Closure](./ARCHITECTURE/DOMAIN-BUSINESS-MODEL-IMPLEMENTATION-CLOSURE.md)
- [Domain Implementation Reconciliation](./ARCHITECTURE/DOMAIN-IMPLEMENTATION-RECONCILIATION.md)
- [Workflow State Machine Contract](./ARCHITECTURE/WORKFLOW-STATE-MACHINE-TECHNICAL-CONTRACT-V1.md)
- [Persistence Implementation Authorization](./ARCHITECTURE/PERSISTENCE-IMPLEMENTATION-AUTHORIZATION-DECISION-V1.md)
- [Persistence Physical Structural Definition](./ARCHITECTURE/PERSISTENCE-PHYSICAL-STRUCTURAL-DEFINITION-V1.md)
- [Persistence Schema Implementation Plan](./ARCHITECTURE/PERSISTENCE-SCHEMA-IMPLEMENTATION-PLAN-V1.md)
- [Implementation Reconciliation Decision A01](./ARCHITECTURE/IMPLEMENTATION-RECONCILIATION-DECISION-A01.md)

Each document has a defined role. A vision document preserves future ideas; a contract defines a boundary; an authorization decision permits a bounded activity; a proof records whether the activity passed. No single document silently replaces the others.

## Design invariants

The following invariants are treated as architectural safety rules:

```text
Patient identity remains stable.
A Case belongs to one Patient.
A Visit belongs to one Case and one Clinic Day.
Visit Exit does not automatically complete a Case.
Clinic Day Closure does not automatically complete a Case.
Past History remains separate from Clinical History.
Previous Visits are not silently overwritten.
Doctor authority is not transferred through Nurse delegation.
No new Actor or product capability is introduced implicitly.
```

## Project status

The original project status above is preserved as the historical starting point. The current architectural status is recorded here:

```text
PRODUCT = Dr.Roby Clinic
CURRENT FOCUS = Architecture-first reconciliation and controlled implementation
DOMAIN REPRESENTATION = CLOSED + PROVEN
IMPLEMENTATION DISCIPLINE = CONTRACT-GOVERNED
```

Runtime, persistence, authentication, authorization, API, UI, and deployment work remain subject to their own contracts and authorization boundaries. The presence of an old implementation attempt does not make it the architectural baseline.

## The project's operating principle

> **The catalog preserves memory. The Manuscript governs. Contracts authorize. Proof validates. MOHAMED.K_ROBY decides.**

Dr.Roby Clinic is built one bounded decision at a time so that the finished product remains understandable, safe to evolve, and faithful to the reality of clinic work.

## License and project maturity

The project is under active architectural development. Product scope, implementation status, and technical authorization are recorded in the repository's architecture documents rather than inferred from the existence of source files.

---

**Dr.Roby Clinic** — a focused clinic product built with clinical experience, architectural discipline, and a respect for time.
