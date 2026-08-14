# NIPRIS — RBAC + ABAC Authorization & Permission Matrix

NIPRIS uses a dual-layer authorization engine combining **Role-Based Access Control (RBAC)** for coarse action permission and **Attribute-Based Access Control (ABAC)** for fine-grained contextual rule evaluation (Organization Scope, Jurisdiction, Operational Purpose, Duty Status, Record Classification).

---

## 1. Action Permissions Matrix

| Resource & Action | L0 Super Admin | L1 National | L2 State | L5 Station Cmd | L6 Investigator | L7 Patrol | L8 Evidence | L10 Forensic | L11 Auditor | L12 IA |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **System Config** | ALLOW | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| **User Provisioning**| ALLOW | ALLOW* | ALLOW* | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| **Person Search** | DENY | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW* | DENY | ALLOW* | DENY | ALLOW |
| **Cross-State Search**| DENY | ALLOW | ALLOW* | DENY | ALLOW* | DENY | DENY | DENY | DENY | ALLOW |
| **Incident Create** | DENY | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW | DENY | DENY | DENY | DENY |
| **Arrest Record Create**| DENY | DENY | ALLOW | ALLOW | ALLOW | ALLOW | DENY | DENY | DENY | DENY |
| **Case Edit** | DENY | DENY | DENY | ALLOW* | ALLOW | DENY | DENY | DENY | DENY | DENY |
| **Evidence Ingest** | DENY | DENY | DENY | DENY | ALLOW | DENY | ALLOW | DENY | DENY | DENY |
| **Bodycam Playback** | DENY | ALLOW* | ALLOW* | ALLOW | ALLOW* | DENY | ALLOW | DENY | DENY | ALLOW |
| **Biometric Match** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | ALLOW | DENY | DENY |
| **Audit Log View** | ALLOW* | DENY | DENY | DENY | DENY | DENY | DENY | DENY | ALLOW | ALLOW |
| **IA Misconduct Flag**| DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | ALLOW |

*\* Note: Allowed only under strict ABAC contextual constraints detailed in Section 2.*

---

## 2. ABAC Contextual Evaluation Rules

When an officer attempts an action, the **Policy Evaluation Engine** calculates:
$$\text{Decision} = \text{RBAC\_Check}(\text{Role}, \text{Action}) \land \text{ABAC\_Check}(\text{Context})$$

Where $\text{ABAC\_Check}(\text{Context})$ evaluates:
1. **Officer Jurisdiction Scope**: Does the officer belong to the command owning the record, or is there an active approved cross-state authorization request?
2. **Duty Status & Schedule**: Is the officer currently clocked into active duty on the roster?
3. **Operational Purpose Validation**: Did the officer submit a non-empty, valid operational reason (e.g., active incident ID, case number, warrant execution)?
4. **Data Classification Level**: Does the officer's security clearance clear the target record's classification tier?
5. **Sealed Record Guard**: Is the record sealed by court order? If sealed, access is denied unless a dual-custody judicial override key is provided.

---

## 3. Mandatory Authorization State Indicators in UX

In compliance with the **Critical UX Rule**, NIPRIS frontend components never hide restricted states or fail silently.
- If a search query yields records outside an officer's authorized command scope:
  - The UI explicitly renders: `"Access restricted by your authorization level."`
  - The UI **does not disclose sensitive details** of un-cleared records while acknowledging security policy enforcement.
