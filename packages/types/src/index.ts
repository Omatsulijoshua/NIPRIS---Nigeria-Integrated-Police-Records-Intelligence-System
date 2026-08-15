export enum OrgLevel {
  NATIONAL_HQ = "NATIONAL_HQ",
  STATE_COMMAND = "STATE_COMMAND",
  AREA_COMMAND = "AREA_COMMAND",
  DIVISION = "DIVISION",
  POLICE_STATION = "POLICE_STATION",
  SPECIAL_UNIT = "SPECIAL_UNIT"
}

export enum OfficerRole {
  NATIONAL_SUPER_ADMIN = "NATIONAL_SUPER_ADMIN",     // Level 0
  NATIONAL_COMMAND_ADMIN = "NATIONAL_COMMAND_ADMIN", // Level 1
  STATE_COMMAND_ADMIN = "STATE_COMMAND_ADMIN",       // Level 2
  AREA_COMMAND_ADMIN = "AREA_COMMAND_ADMIN",         // Level 3
  DIVISION_ADMIN = "DIVISION_ADMIN",                 // Level 4
  STATION_COMMANDER = "STATION_COMMANDER",           // Level 5
  INVESTIGATING_OFFICER = "INVESTIGATING_OFFICER",   // Level 6
  PATROL_OFFICER = "PATROL_OFFICER",                 // Level 7
  EVIDENCE_OFFICER = "EVIDENCE_OFFICER",             // Level 8
  BODYCAM_ADMIN = "BODYCAM_ADMIN",                   // Level 9
  FORENSIC_OFFICER = "FORENSIC_OFFICER",             // Level 10
  AUDITOR = "AUDITOR",                               // Level 11
  INTERNAL_AFFAIRS = "INTERNAL_AFFAIRS",             // Level 12
  COURT_INTEGRATION = "COURT_INTEGRATION",           // Level 13
  READ_ONLY_VIEWER = "READ_ONLY_VIEWER"              // Level 14
}

export enum OfficerRank {
  INSPECTOR_GENERAL = "Inspector General of Police (IGP)",
  DEPUTY_INSPECTOR_GENERAL = "Deputy Inspector General of Police (DIG)",
  ASSISTANT_INSPECTOR_GENERAL = "Assistant Inspector General of Police (AIG)",
  COMMISSIONER = "Commissioner of Police (CP)",
  DEPUTY_COMMISSIONER = "Deputy Commissioner of Police (DCP)",
  ASSISTANT_COMMISSIONER = "Assistant Commissioner of Police (ACP)",
  CHIEF_SUPERINTENDENT = "Chief Superintendent of Police (CSP)",
  SUPERINTENDENT = "Superintendent of Police (SP)",
  DEPUTY_SUPERINTENDENT = "Deputy Superintendent of Police (DSP)",
  ASSISTANT_SUPERINTENDENT = "Assistant Superintendent of Police (ASP)",
  INSPECTOR = "Inspector of Police",
  SERGEANT = "Sergeant",
  CORPORAL = "Corporal",
  CONSTABLE = "Constable"
}

export enum EmploymentStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TRANSFERRED = "TRANSFERRED",
  TERMINATED = "TERMINATED"
}

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

export enum IncidentStatus {
  REPORTED = "REPORTED",
  DISPATCHED = "DISPATCHED",
  RESPONDING = "RESPONDING",
  ON_SCENE = "ON_SCENE",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
  CLOSED = "CLOSED",
  REOPENED = "REOPENED"
}

export enum IncidentPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum IncidentPersonRole {
  SUSPECT = "SUSPECT",
  VICTIM = "VICTIM",
  WITNESS = "WITNESS",
  REPORTER = "REPORTER"
}

export enum CustodyStatus {
  IN_CUSTODY = "IN_CUSTODY",
  BAIL_GRANTED = "BAIL_GRANTED",
  PROSECUTED = "PROSECUTED",
  RELEASED = "RELEASED"
}

export enum BailStatus {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  BAIL_PENDING = "BAIL_PENDING",
  BAIL_GRANTED = "BAIL_GRANTED",
  BAIL_REVOKED = "BAIL_REVOKED"
}

export enum CaseStatus {
  OPEN = "OPEN",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
  PENDING_PROSECUTION = "PENDING_PROSECUTION",
  CLOSED = "CLOSED",
  REOPENED = "REOPENED"
}

export enum WarrantType {
  ARREST_WARRANT = "ARREST_WARRANT",
  SEARCH_WARRANT = "SEARCH_WARRANT",
  BENCH_WARRANT = "BENCH_WARRANT"
}

export enum WarrantStatus {
  ACTIVE = "ACTIVE",
  EXECUTED = "EXECUTED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED"
}

export enum EvidenceCategory {
  BODYCAM_FOOTAGE = "BODYCAM_FOOTAGE",
  DASHCAM_FOOTAGE = "DASHCAM_FOOTAGE",
  PHOTOGRAPH = "PHOTOGRAPH",
  AUDIO_RECORDING = "AUDIO_RECORDING",
  FORENSIC_DOCUMENT = "FORENSIC_DOCUMENT",
  PHYSICAL_ASSET_PHOTO = "PHYSICAL_ASSET_PHOTO"
}

export enum EvidenceCustodyAction {
  INTAKE = "INTAKE",
  TRANSFER_TO_LAB = "TRANSFER_TO_LAB",
  CHECKOUT_COURT = "CHECKOUT_COURT",
  RETURN_TO_VAULT = "RETURN_TO_VAULT",
  SEAL_EVIDENCE = "SEAL_EVIDENCE"
}

export enum EvidenceHashVerificationStatus {
  VERIFIED_INTACT = "VERIFIED_INTACT",
  TAMPER_ALERT = "TAMPER_ALERT"
}

export enum DeviceType {
  BODY_WORN_CAMERA = "BODY_WORN_CAMERA",
  DASHCAM = "DASHCAM"
}

export enum DeviceStatus {
  UNASSIGNED = "UNASSIGNED",
  ASSIGNED = "ASSIGNED",
  IN_SERVICE = "IN_SERVICE",
  MAINTENANCE = "MAINTENANCE",
  DECOMMISSIONED = "DECOMMISSIONED"
}

export enum RetentionPolicy {
  AUTOMATIC_PURGE_90_DAYS = "AUTOMATIC_PURGE_90_DAYS",
  INVESTIGATIVE_HOLD_1_YEAR = "INVESTIGATIVE_HOLD_1_YEAR",
  EVIDENTIARY_HOLD_PERMANENT = "EVIDENTIARY_HOLD_PERMANENT"
}

export enum RedactionStatus {
  UNREDACTED = "UNREDACTED",
  REDACTION_APPLIED = "REDACTION_APPLIED",
  MASKING_PREVIEW = "MASKING_PREVIEW"
}

export enum WantedRiskLevel {
  EXTREMELY_DANGEROUS = "EXTREMELY_DANGEROUS",
  ARMED_AND_DANGEROUS = "ARMED_AND_DANGEROUS",
  FLIGHT_RISK = "FLIGHT_RISK"
}

export enum WantedStatus {
  ACTIVE = "ACTIVE",
  CAPTURED = "CAPTURED",
  DECEASED = "DECEASED",
  CLEARED = "CLEARED"
}

export enum LegalStatus {
  ARREST = "ARREST",
  CHARGE = "CHARGE",
  PROSECUTION = "PROSECUTION",
  CONVICTION = "CONVICTION",
  ACQUITTAL = "ACQUITTAL",
  DISMISSED = "DISMISSED",
  PENDING = "PENDING",
  RELEASED = "RELEASED"
}

export enum ClassificationLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  LAW_ENFORCEMENT_RESTRICTED = "LAW_ENFORCEMENT_RESTRICTED",
  HIGHLY_RESTRICTED = "HIGHLY_RESTRICTED",
  SEALED = "SEALED",
  BIOMETRIC_RESTRICTED = "BIOMETRIC_RESTRICTED",
  EVIDENCE_RESTRICTED = "EVIDENCE_RESTRICTED"
}

export enum IdentityMatchStatus {
  MATCH = "MATCH",
  POSSIBLE_MATCH = "POSSIBLE_MATCH",
  NO_MATCH = "NO_MATCH"
}

export interface UserSessionPayload {
  officerId: string;
  badgeNumber: string;
  email: string;
  role: OfficerRole;
  orgId: string;
  state?: string;
  mfaVerified: boolean;
  sessionId: string;
}

export interface OrganizationNode {
  id: string;
  code: string;
  name: string;
  level: OrgLevel;
  parentId?: string;
  state?: string;
  createdAt: string;
}

export interface OfficerProfile {
  id: string;
  badgeNumber: string;
  firstName: string;
  lastName: string;
  rank: OfficerRank;
  email: string;
  role: OfficerRole;
  orgId: string;
  state?: string;
  department?: string;
  status: EmploymentStatus;
  createdAt: string;
}

export interface PersonIdentifier {
  type: "NIN" | "DRIVERS_LICENSE" | "VOTER_ID" | "PASSPORT";
  value: string;
}

export interface PersonMasterRecord {
  id: string;
  nin?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  aliases: string[];
  dateOfBirth: string;
  sex: string;
  nationality: string;
  photoUrl?: string;
  biometricRef?: string;
  classification: ClassificationLevel;
  identifiers: PersonIdentifier[];
  createdAt: string;
  updatedAt: string;
}

export interface IdentityResolutionResult {
  status: IdentityMatchStatus;
  confidenceScore: number;
  matchedPerson?: PersonMasterRecord;
  possibleCandidates: PersonMasterRecord[];
  requiresHumanVerification: boolean;
  notes: string;
}

export interface CameraDevice {
  id: string;
  deviceSerial: string;
  model: string;
  deviceType: DeviceType;
  orgId: string;
  assignedOfficerId?: string;
  status: DeviceStatus;
  batteryPercentage: number;
  availableStorageBytes: number;
  lastSyncTimestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface TelemetryPoint {
  latitude: number;
  longitude: number;
  speedKmH: number;
  timestamp: string;
  dutyStatus: string;
}

export interface TimeSyncMarker {
  id: string;
  timestampSeconds: number;
  tag: "FORCE_USED" | "WEAPON_DRAWN" | "TRAFFIC_STOP" | "ARREST_MADE" | "OFFICER_ASSISTANCE";
  notes?: string;
}

export interface BodycamRecordingRecord {
  id: string;
  recordingNumber: string;
  deviceSerial: string;
  officerId: string;
  officerName?: string;
  incidentId?: string;
  caseId?: string;
  startTimestamp: string;
  endTimestamp: string;
  durationSeconds: number;
  fileSizeBytes: number;
  streamUrl: string;
  sha256Hash: string;
  telemetryTrack: TelemetryPoint[];
  markerTags: TimeSyncMarker[];
  retentionPolicy: RetentionPolicy;
  redactionStatus: RedactionStatus;
  classification: ClassificationLevel;
  createdAt: string;
  updatedAt: string;
}

export interface JudicialAuthorityMetadata {
  issuingJudgeName: string;
  courtName: string;
  jurisdiction: string;
  courtSealNumber: string;
}

export interface WarrantRecord {
  id: string;
  warrantNumber: string;
  warrantType: WarrantType;
  targetPersonId: string;
  targetPersonName: string;
  caseId?: string;
  incidentId?: string;
  judicialAuthority: JudicialAuthorityMetadata;
  offenseAllegations: string;
  issueDate: string;
  expirationDate: string;
  status: WarrantStatus;
  state: string;
  executingOfficerId?: string;
  executedAt?: string;
  executionLocation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WantedPersonRecord {
  id: string;
  personId: string;
  personName: string;
  photoUrl?: string;
  caseId?: string;
  warrantIds: string[];
  riskLevel: WantedRiskLevel;
  bountyAmount?: number;
  publicCircular: boolean;
  status: WantedStatus;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChainOfCustodyLogEntry {
  id: string;
  performedByOfficerId: string;
  action: EvidenceCustodyAction;
  recipientOrLocation: string;
  rationale: string;
  timestamp: string;
  hashVerificationStatus: EvidenceHashVerificationStatus;
}

export interface DigitalEvidenceRecord {
  id: string;
  evidenceNumber: string;
  title: string;
  category: EvidenceCategory;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  storageUrl: string;
  sha256Hash: string;
  classification: ClassificationLevel;
  incidentId?: string;
  caseId?: string;
  personId?: string;
  seizingOfficerId: string;
  seizedLocation: string;
  seizedAt: string;
  chainOfCustody: ChainOfCustodyLogEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ArrestRecord {
  id: string;
  arrestNumber: string;
  personId: string;
  personName: string;
  incidentId?: string;
  arrestingOfficerId: string;
  arrestingStationId: string;
  state: string;
  arrestedAt: string;
  location: string;
  legalBasis: string;
  charges: string[];
  custodyStatus: CustodyStatus;
  bailStatus: BailStatus;
  legalStatus: LegalStatus;
  custodyLocation: string;
  releaseDate?: string;
  caseReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseEvidenceLink {
  id: string;
  assetType: "EVIDENCE" | "BODYCAM" | "DASHCAM" | "PHOTO" | "DOCUMENT";
  assetId: string;
  title: string;
  url?: string;
  notes?: string;
}

export interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  priority: IncidentPriority;
  status: CaseStatus;
  leadInvestigatorId: string;
  teamOfficerIds: string[];
  state: string;
  classification: ClassificationLevel;
  incidentIds: string[];
  arrestIds: string[];
  personIds: string[];
  evidenceLinks: CaseEvidenceLink[];
  timeline: Array<{ id: string; action: string; performedBy: string; timestamp: string; details?: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentPersonLink {
  id: string;
  personId: string;
  personName: string;
  roleInIncident: IncidentPersonRole;
  notes?: string;
}

export interface IncidentTimelineEvent {
  id: string;
  action: string;
  performedBy: string;
  previousState?: string;
  newState?: string;
  timestamp: string;
  details?: string;
}

export interface IncidentRecord {
  id: string;
  incidentNumber: string;
  title: string;
  description: string;
  incidentType: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  occurredAt: string;
  reportingOfficerId: string;
  assignedOfficerIds: string[];
  status: IncidentStatus;
  priority: IncidentPriority;
  classification: ClassificationLevel;
  persons: IncidentPersonLink[];
  timeline: IncidentTimelineEvent[];
  reports: Array<{ id: string; officerId: string; reportText: string; timestamp: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
