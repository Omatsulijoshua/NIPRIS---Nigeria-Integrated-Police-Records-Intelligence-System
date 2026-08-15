# NIPRIS Security, Legal & Constitutional Compliance Framework

## 1. Constitutional Guardband: Arrest vs. Conviction
Under Nigerian Constitutional Law (Section 36(5) 1999 Constitution as amended), every person is presumed innocent until proven guilty by a court of competent jurisdiction.
- **Arrest Records**: Represent administrative custody ONLY. An arrest record strictly DOES NOT imply guilt or criminal conviction.
- **Conviction Records**: Created strictly upon receipt of verified Judicial Conviction Orders from Courts of Record (`Form NPF 14` Charge Sheet linked to Court Order).

---

## 2. Zero-Trust ABAC Policy Guard
All record access requests are checked dynamically against Attribute-Based Access Control (ABAC) rules:
1. Active Officer MFA session required.
2. Verified State / Command Jurisdiction matching target record state (or explicit Emergency Jurisdiction Override rationale).
3. Minimum 10-character Operational Purpose Justification rationale.

---

## 3. Cryptographic Audit Blockchain
All system operations (searches, view records, exports) emit immutable audit logs linked via SHA-256 block hash chaining:
$$\text{Block}_N.\text{hash} = \text{SHA256}(\text{Block}_{N-1}.\text{hash} + \text{Data}_N + \text{Timestamp}_N)$$
Any tampering invalidates the hash chain and triggers immediate Internal Affairs escalation.
