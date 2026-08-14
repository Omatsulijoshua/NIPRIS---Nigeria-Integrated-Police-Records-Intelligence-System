# NIPRIS — UI Architecture & Design System Specification

## 1. UX Design Philosophy

NIPRIS UI is engineered for mission-critical law enforcement operations:
- **Function-Driven Design**: High information density, zero clutter, rapid keyboard navigation, clear visual hierarchy.
- **Restrained Professional Palette**: Slate, Navy Blue, Crimson (alerts only), Gold/Amber (warning/pending), Emerald (verified/active status). No unnecessary gradients, dark purple overlays, or decorative particle effects.
- **Accessibility & Contrast**: High-contrast text readability (WCAG AAA compliant) optimized for outdoor mobile use and command center displays.

---

## 2. Web & Mobile Layout Architecture

### 2.1 Web Application Layout (Next.js 14)
- **Top Command Bar**: Active Officer Identity, Station Context, Badge Number, Security Clearance Level, Active Duty Status, Emergency Broadcast Notification Pill.
- **Left Navigation**: Role-driven module navigation (Incidents, Persons, Arrests, Cases, Warrants, Evidence, Bodycam, Audit, Admin).
- **Central Operational Workbench**: Multi-tab interface supporting rapid context switching between search parameters and active case management.

### 2.2 Mobile Officer Application Layout (Flutter)
- **Duty Banner**: Quick-toggle Duty Status (On Duty / Responding / En Route), Emergency Panic Button.
- **Action Grid**: Rapid access tiles (Identity Search, Active Warrants, Incident Ingestion, Bodycam Status).
- **Encrypted Local Cache Indicator**: Status of encrypted offline storage sync.

---

## 3. Law Enforcement Design System Components

| Component | Visual Specification | Usage & Rules |
| :--- | :--- | :--- |
| **Status Badges** | Solid pill badge with distinct semantic colors (`ARREST`: Slate, `PROSECUTION`: Indigo, `CONVICTION`: Dark Red, `RELEASED`: Muted Green). | Explicitly distinguishes arrest status from conviction status. |
| **Authorization Alerts** | Dark Amber container with Shield Icon and bold warning typography. | Renders: `"Access restricted by your authorization level."` when record access is withheld. |
| **Audit Confirmation Modal** | High-contrast confirmation modal requiring mandatory text entry for Operational Reason before initiating sensitive lookups. | Forces officer accountability prior to cross-state or person queries. |
| **Video Player Watermarking** | Overlay displaying Officer Badge ID, Request IP, and Timestamp across moving HLS stream. | Prevents unauthorized phone camera screen capture of bodycam evidence. |
