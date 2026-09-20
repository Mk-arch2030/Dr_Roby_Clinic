# PERSISTENCE PHYSICAL STRUCTURAL DEFINITION V1

STATUS = CLOSED + PROVEN
PURPOSE = DEFINE THE BOUNDED PHYSICAL STRUCTURE OF THE CLOSED CLINIC PERSISTENCE MODEL
IMPLEMENTATION_EXECUTION = NOT PERFORMED
SQL_EXECUTION = NOT PERFORMED
FAIL = 0

---

## 1. AUTHORITY AND BOUNDARY

This definition translates the already-closed and proven Clinic persistence model into a bounded physical structural definition.

This artifact MUST preserve the authoritative Clinic model established by:

- PERSISTENCE-SCHEMA-DEFINITION-V1
- PERSISTENCE-TECHNICAL-CONTRACT-V1
- PERSISTENCE-SCHEMA-A01-RECONCILIATION-DECISION
- PERSISTENCE-SCHEMA-A01-PROOF
- PERSISTENCE-SCHEMA-IMPLEMENTATION-PLAN-V1

This definition MUST NOT redefine Clinic product behavior.

This definition MUST NOT authorize:

- SQL execution
- migrations
- ORM implementation
- repositories
- services
- API implementation
- UI implementation
- authentication implementation
- authorization implementation
- deployment

---

## 2. AUTHORITATIVE PERSISTENCE CHAIN

The physical structure MUST preserve:

Patient
  -> Case
      -> Visit
          -> Clinic Day

Required boundaries:

- Patient identity remains persistent and stable.
- Case belongs to exactly one Patient.
- Visit belongs to exactly one Case.
- Visit belongs to exactly one Clinic Day.
- One Case may contain many Visits.
- One Case may span multiple Clinic Days.
- Previous Visits MUST remain preserved.
- A later Visit MUST NOT overwrite an earlier Visit.

---

## 3. PATIENT STRUCTURE

### 3.1 Patient

Patient is a persistent clinic identity.

Required structural concepts:

- technical Patient identifier
- stable Clinic Patient Number (CPN)
- Patient identity data required by the closed Product model
- active/inactive identity state as required by established Product boundaries

Required integrity:

- technical Patient identifier is unique.
- CPN is unique among active Patient identities.
- CPN remains stable across returning Visits.
- Visit creation MUST NOT create a new Patient or CPN.

CPN and the technical Patient identifier MUST remain distinct.

---

## 4. CASE STRUCTURE

### 4.1 Case

Case represents a clinical journey belonging to one Patient.

Required structural concepts:

- technical Case identifier
- Patient relationship
- current Case State
- Case Completion representation

Case State is CURRENT STATE ONLY.

Approved Case states remain exactly:

1. Arrived — Awaiting Registration
2. Awaiting Doctor
3. With Doctor
4. Exited — Follow-up Pending
5. Completed

Required integrity:

- every Case references exactly one Patient.
- one Patient may have many Cases.
- Case state MUST remain within the approved state set.
- Case Completion is distinct from Visit Exit.
- Case Completion is distinct from Clinic Day Closure.
- Completed By MUST represent Doctor authority when Case is completed.

No independent Case State History structure is introduced.

No dedicated Completion Record is introduced.

---

## 5. VISIT STRUCTURE

### 5.1 Visit

Visit represents one organized clinical encounter.

Required structural concepts:

- technical Visit identifier
- Case relationship
- Clinic Day relationship
- Visit Type
- Visit Protection State
- Arrival Patient Condition
- Visit Clinical Content

Required relationships:

- every Visit belongs to exactly one Case.
- every Visit belongs to exactly one Clinic Day.
- one Case may contain many Visits.

Approved Visit Type:

`Visit & Consultation`

Visit Type remains a direct Visit value.

No separate Visit Type entity is introduced.

### 5.2 Arrival Patient Condition

Arrival Patient Condition is Visit-level intake information.

Each Visit may persist one Arrival Patient Condition.

Approved values:

- Normal
- Moderately Unwell
- Severely Unwell

Arrival Patient Condition remains distinct from:

- Vital Signs
- Diagnosis
- Treatment
- Clinical Decision
- Patient-level Past History

No new Vital Signs persistence structure is introduced by this definition.

---

## 6. CLINIC DAY STRUCTURE

### 6.1 Clinic Day

Clinic Day provides the operational working-date context.

Required structural concept:

- Working Date

Integrity:

- exactly one Clinic Day exists for each Working Date.
- Working Date is unique across Clinic Day records.
- Visits retain their Clinic Day relationship.

Clinic Day MUST NOT:

- create Case
- create Visit
- complete Case
- grant Nurse clinical authority

Clinic Day Closure MUST NOT complete an open Case.

Midnight MUST NOT be treated as automatic Clinic Day closure.

No independent Product identity beyond Working Date is introduced.

---

## 7. PAST HISTORY STRUCTURE

### 7.1 Past History Item

Past History is Patient-level.

Required structural concepts:

- technical Past History Item identifier
- Patient relationship
- history item content required by the Product model
- current item state/content as authorized by Product rules

Required integrity:

- one Patient may have many Past History Items.
- Past History remains distinct from Clinical History.
- Past History is not a Visit.
- Doctor holds authority for Past History changes.

No Past History item may become a Visit record.

---

## 8. ACTOR STRUCTURE

### 8.1 Actor

The persistence boundary contains one technical Actor concept.

Required structural concepts:

- technical Actor identifier
- Actor Identity
- Actor Role / Authority Context
- account state required by established Product boundaries

Approved Product roles:

- Doctor
- Nurse

Required boundaries:

- Doctor creates Nurse Account.
- Nurse does not self-register through public registration.
- Creating a Nurse Account MUST NOT transfer Clinical Authority.
- Creating a Nurse Account MUST NOT transfer Main Admin authority.
- Creating a Nurse Account MUST NOT transfer System Ownership.

Detailed Nurse delegated permissions remain outside this physical definition.

No authorization model is invented here.

---

## 9. VISIT CLINICAL CONTENT STRUCTURE

### 9.1 Clinical Content Boundary

Clinical Content remains associated with its authoritative Visit.

The physical structure MUST preserve these separate Product concepts:

- Current Complaint
- Investigation
- Diagnosis
- Treatment
- Follow-up

Required cardinalities:

- Current Complaint = exactly one value per Visit.
- Investigation = zero or many entries per Visit.
- Diagnosis = exactly one value per Visit.
- Treatment = many entries per Visit.
- Follow-up = exactly one value per Visit.

Investigation and Diagnosis MUST remain separate concepts.

Diagnosis MUST preserve the approved distinction between preliminary and final according to Doctor clinical decision.

### 9.2 Physical Representation Boundary

This definition establishes the physical structural boundary only.

It does NOT yet select final SQL table syntax, SQL data types, ORM mappings, or repository implementation.

The physical representation MUST NOT collapse distinct Product concepts merely for implementation convenience.

A single combined Clinical Content structure is therefore NOT assumed by this definition.

Separate physical structures MAY be used where required to preserve the approved cardinalities and boundaries, subject to later controlled implementation authorization.

---

## 10. CLINICAL HISTORY

Clinical History is a DERIVED CONCEPT.

Clinical History MUST NOT be established as an independently maintained source of truth.

The physical persistence model MUST preserve:

- Visit boundaries
- Visit chronology
- originating Patient
- originating Case
- originating Clinic Day
- Visit Clinical Content

Clinical History MUST be derivable from authoritative recorded Visits.

No mutable latest-value Clinical History structure is introduced.

Visits remain the authoritative clinical source.

---

## 11. FOLLOW-UP TASK

Follow-up remains a Visit Clinical Content area.

The persistence structure MUST permit a Follow-up Task as an operational extension of Follow-up.

Required structural boundary:

- Follow-up Task MUST remain associated with its originating Visit/Follow-up context.
- Follow-up Task MUST NOT replace the Visit's Follow-up content.
- Follow-up Task lifecycle remains DEFERRED.

No final lifecycle state model is introduced here.

---

## 12. CLINICAL ATTACHMENTS

Clinical Attachments are an established Product capability.

The persistence structure MUST permit Clinical Attachments associated with the established clinical context.

The exact physical storage mechanism remains DEFERRED.

This definition MUST NOT select:

- filesystem architecture
- object storage architecture
- database binary storage
- external storage provider

---

## 13. VISIT PROTECTION

Visit Protection is represented at Visit level.

Required structural boundary:

- Visit Protection State belongs to the Visit.
- Clinic Day closure establishes the applicable protection requirement.
- Protected Visit amendments require Doctor Authorization.
- Protection MUST NOT delete or replace recorded Visit data.

The technical amendment-preservation mechanism remains DEFERRED.

---

## 14. CLINICAL CONTENT AMENDMENT PRESERVATION

Clinical Content already recorded within a Visit may be amended only with Doctor Authorization according to the established Product contract.

The amendment occurrence is a Product Fact and MUST be preserved.

The physical structure MUST therefore permit preservation of the required amendment occurrence without silently overwriting the historical fact.

The exact technical mechanism remains DEFERRED.

No generic Audit Log or Event Sourcing structure is introduced by this definition.

---

## 15. DELETE / TRASH / RETENTION BOUNDARY

Existing Product boundaries for:

- Patient Trash
- Visit Trash
- deletion
- retention

remain authoritative.

This definition MUST NOT invent new deletion behavior.

Visit Trash remains distinct from Patient Trash.

The exact physical mechanism for trash and retention remains DEFERRED.

---

## 16. CORE RELATIONSHIP MAP

The physical structure MUST preserve the following relationships:

Patient
  1 -> many Cases

Case
  1 -> many Visits

Clinic Day
  1 -> many Visits

Patient
  1 -> many Past History Items

Visit
  1 -> one Case
  1 -> one Clinic Day
  1 -> one Visit Clinical Content boundary

Visit
  1 -> zero or many Investigations
  1 -> one Diagnosis
  1 -> many Treatments
  1 -> one Follow-up

Visit
  1 -> zero or many Follow-up Tasks where established by Follow-up

Clinical Attachments
  -> associated with established clinical context

Clinical History
  -> derived from preserved Visits
  -> NOT independently persisted as a source of truth

---

## 17. INTEGRITY REQUIREMENTS

The physical structure MUST preserve at minimum:

1. Patient technical identity uniqueness.
2. CPN uniqueness and stability.
3. Patient -> Case relationship.
4. Case -> Visit relationship.
5. Visit -> Clinic Day relationship.
6. One Clinic Day per Working Date.
7. Valid Visit Type.
8. Valid Visit Protection State.
9. Valid Case Current State.
10. Coherent Case Completion representation.
11. Clinical Content cardinalities.
12. Clinical Content separation.
13. Previous Visit preservation.
14. Clinical History derivation from Visits.
15. Past History separation from Clinical History.
16. Doctor-authorized Clinical Content amendment occurrence preservation.
17. No cross-Visit Clinical Content overwrite.

---

## 18. EXPLICIT NON-STRUCTURES

The following MUST NOT be introduced as independent structures by this definition unless a later controlled Product decision explicitly authorizes them:

- Clinical History source-of-truth table
- Case State History
- Dedicated Completion Record
- Visit Type entity
- generic Audit Log
- generic Event Sourcing model
- independent Vital Signs domain
- separate Clinical Content source that can replace Visit history
- authorization model
- authentication model
- billing/payment structures
- ERP structures

---

## 19. DEFERRED TECHNICAL DECISIONS

Still deferred:

- final SQL table names
- final SQL column names where not already product-defined
- SQL data types
- indexes
- exact constraint syntax
- ORM
- repositories
- migrations
- amendment preservation mechanism
- Follow-up Task lifecycle
- Clinical Attachment storage mechanism
- trash/delete/retention mechanism
- authentication implementation
- authorization implementation
- deployment
- other explicitly deferred Product decisions

---

## 20. SAFETY INVARIANTS

NEW_PRODUCT_CAPABILITY = NO
NEW_ACTOR = NO
AUTHORITY_TRANSFER = NO
CONTRACT_MUTATION = NO
RANDOM_REFACTORING = NO
UNAUTHORIZED_EXPANSION = NO

---

## 21. CURRENT GATE

PHYSICAL_STRUCTURAL_DEFINITION = CLOSED
IMPLEMENTATION_EXECUTION = NOT PERFORMED
SQL_EXECUTION = NOT PERFORMED
FAIL = 0

RECONCILIATION = PASS
NEXT GATE =
PHYSICAL STRUCTURAL DEFINITION PROOF
