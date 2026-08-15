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
  READ_ONLY_VIEWER = "READ_ONLY_VIEWER",             // Level 14
  STATION_ADMIN = "STATION_ADMIN",                   // Station Admin
  DESK_OFFICER = "DESK_OFFICER"                      // Desk Officer
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

export enum CadDispatchStatus {
  QUEUED_FOR_DISPATCH = "QUEUED_FOR_DISPATCH",
  DISPATCHED = "DISPATCHED",
  PATROL_EN_ROUTE = "PATROL_EN_ROUTE",
  ON_SCENE = "ON_SCENE",
  INCIDENT_RESOLVED = "INCIDENT_RESOLVED"
}

export enum SystemHealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY"
}

export enum ComplaintStatus {
  NEW = "NEW",
  RECEIVED = "RECEIVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  ASSIGNED = "ASSIGNED",
  CONVERTED_TO_INCIDENT = "CONVERTED_TO_INCIDENT",
  CONVERTED_TO_CASE = "CONVERTED_TO_CASE",
  REFERRED = "REFERRED",
  CLOSED = "CLOSED"
}

export enum ShiftType {
  DAY = "DAY",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  PATROL = "PATROL",
  INVESTIGATION = "INVESTIGATION",
  DESK = "DESK",
  SPECIAL_ASSIGNMENT = "SPECIAL_ASSIGNMENT"
}

export enum OperationalStatus {
  ON_DUTY = "ON_DUTY",
  OFF_DUTY = "OFF_DUTY",
  ON_PATROL = "ON_PATROL",
  AT_STATION = "AT_STATION",
  ON_ASSIGNMENT = "ON_ASSIGNMENT",
  ON_LEAVE = "ON_LEAVE",
  SUSPENDED = "SUSPENDED",
  UNAVAILABLE = "UNAVAILABLE",
  EMERGENCY_ASSIGNMENT = "EMERGENCY_ASSIGNMENT"
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

export enum PccStatus {
  APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
  BIOMETRIC_VERIFICATION_PENDING = "BIOMETRIC_VERIFICATION_PENDING",
  BACKGROUND_CHECK_IN_PROGRESS = "BACKGROUND_CHECK_IN_PROGRESS",
  CERTIFICATE_ISSUED = "CERTIFICATE_ISSUED",
  REJECTED = "REJECTED"
}

export enum StolenVehicleStatus {
  NOT_REPORTED_STOLEN = "NOT_REPORTED_STOLEN",
  STOLEN_VEHICLE_ALERT = "STOLEN_VEHICLE_ALERT",
  RECOVERED = "RECOVERED"
}

export enum RemandStatus {
  REMAND_PENDING_TRIAL = "REMAND_PENDING_TRIAL",
  SERVING_SENTENCE = "SERVING_SENTENCE",
  RELEASED_ON_BAIL = "RELEASED_ON_BAIL",
  SENTENCE_EXPIRED = "SENTENCE_EXPIRED"
}

export enum InmateMovementType {
  COURT_APPEARANCE = "COURT_APPEARANCE",
  MEDICAL_TRANSFER = "MEDICAL_TRANSFER",
  INTER_FACILITY_TRANSIT = "INTER_FACILITY_TRANSIT",
  RELEASE = "RELEASE"
}

export enum CellCapacityStatus {
  NORMAL = "NORMAL",
  NEAR_CAPACITY = "NEAR_CAPACITY",
  OVERCROWDED_ALERT = "OVERCROWDED_ALERT"
}

export enum AgencyGateway {
  NIMC = "NIMC",
  FRSC = "FRSC",
  INEC = "INEC",
  NIS = "NIS"
}

export enum AgencyVerificationStatus {
  VERIFIED_MATCH = "VERIFIED_MATCH",
  RECORD_NOT_FOUND = "RECORD_NOT_FOUND",
  SUSPECTED_FRAUD_FLAG = "SUSPECTED_FRAUD_FLAG"
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

export enum BiometricVerificationStatus {
  PENDING_HUMAN_VERIFICATION = "PENDING_HUMAN_VERIFICATION",
  VERIFIED_MATCH = "VERIFIED_MATCH",
  REJECTED_FALSE_POSITIVE = "REJECTED_FALSE_POSITIVE"
}

export enum HotspotSeverity {
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum JudicialOrderType {
  BAIL_ORDER = "BAIL_ORDER",
  JUDICIAL_INJUNCTION = "JUDICIAL_INJUNCTION",
  STAY_OF_PROCEEDINGS = "STAY_OF_PROCEEDINGS",
  CONVICTION_ORDER = "CONVICTION_ORDER",
  ACQUITTAL_ORDER = "ACQUITTAL_ORDER",
  DISMISSAL_ORDER = "DISMISSAL_ORDER"
}

export enum TrialStatus {
  PENDING_PROSECUTION = "PENDING_PROSECUTION",
  TRIAL_IN_PROGRESS = "TRIAL_IN_PROGRESS",
  CONVICTION = "CONVICTION",
  ACQUITTAL = "ACQUITTAL",
  DISMISSED = "DISMISSED"
}

export enum JudicialSealStatus {
  VALID_SEAL = "VALID_SEAL",
  INVALID_SEAL_SIGNATURE = "INVALID_SEAL_SIGNATURE",
  EXPIRED_JUDICIAL_SEAL = "EXPIRED_JUDICIAL_SEAL"
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

export enum AuditActionType {
  VIEW_RECORD = "VIEW_RECORD",
  SEARCH = "SEARCH",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
  EMERGENCY_OVERRIDE = "EMERGENCY_OVERRIDE",
  BIOMETRIC_MATCH = "BIOMETRIC_MATCH"
}

export enum AuditResourceType {
  PERSON = "PERSON",
  ARREST = "ARREST",
  CASE = "CASE",
  WARRANT = "WARRANT",
  EVIDENCE = "EVIDENCE",
  BODYCAM = "BODYCAM",
  INTELLIGENCE = "INTELLIGENCE",
  SYSTEM = "SYSTEM"
}

export enum AuditTamperStatus {
  VERIFIED_INTACT = "VERIFIED_INTACT",
  TAMPER_SUSPECT = "TAMPER_SUSPECT"
}

export enum InterStateRequestPriority {
  ROUTINE = "ROUTINE",
  URGENT = "URGENT",
  EMERGENCY = "EMERGENCY"
}

export enum InterStateRequestStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EMERGENCY_OVERRIDDEN = "EMERGENCY_OVERRIDDEN",
  EXPIRED = "EXPIRED"
}

export enum InterStateRecordType {
  PERSON_PROFILE = "PERSON_PROFILE",
  CRIMINAL_ARREST = "CRIMINAL_ARREST",
  CASE_FILE = "CASE_FILE",
  INTELLIGENCE_BULLETIN = "INTELLIGENCE_BULLETIN",
  DIGITAL_EVIDENCE = "DIGITAL_EVIDENCE"
}

export enum SourceReliabilityRating {
  A_COMPLETELY_RELIABLE = "A_COMPLETELY_RELIABLE",
  B_USUALLY_RELIABLE = "B_USUALLY_RELIABLE",
  C_FAIRLY_RELIABLE = "C_FAIRLY_RELIABLE",
  D_NOT_USUALLY_RELIABLE = "D_NOT_USUALLY_RELIABLE",
  E_UNRELIABLE = "E_UNRELIABLE",
  F_CANNOT_BE_JUDGED = "F_CANNOT_BE_JUDGED"
}

export enum InformationValidityRating {
  V1_CONFIRMED = "V1_CONFIRMED",
  V2_PROBABLY_TRUE = "V2_PROBABLY_TRUE",
  V3_POSSIBLY_TRUE = "V3_POSSIBLY_TRUE",
  V4_DOUBTFUL = "V4_DOUBTFUL",
  V5_IMPROBABLE = "V5_IMPROBABLE",
  V6_CANNOT_BE_JUDGED = "V6_CANNOT_BE_JUDGED"
}

export enum InformantStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMPROMISED = "COMPROMISED",
  DECOMMISSIONED = "DECOMMISSIONED"
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
  EVIDENCE_RESTRICTED = "EVIDENCE_RESTRICTED",
  CONFIDENTIAL_INTEL = "CONFIDENTIAL_INTEL",
  TOP_SECRET_LAW_ENFORCEMENT = "TOP_SECRET_LAW_ENFORCEMENT"
}

export enum IdentityMatchStatus {
  MATCH = "MATCH",
  POSSIBLE_MATCH = "POSSIBLE_MATCH",
  NO_MATCH = "NO_MATCH"
}

export interface TelemetryPoint {
  latitude: number;
  longitude: number;
  speedKmH: number;
  timestamp: string;
  dutyStatus: string;
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

export interface DbSnapshotRecord {
  id: string;
  snapshotId: string; // e.g. "SNAP-2026-NIPRIS-00912"
  sizeBytes: number;
  sha256Checksum: string;
  encryptionAlgorithm: "AES-256-GCM";
  offsiteRegion: string;
  createdAt: string;
}

export interface FailoverSimulationResult {
  simulatedFailureNode: string; // "PRIMARY_DB_AZ1"
  promotedReplicaNode: string; // "STANDBY_REPLICA_AZ2"
  failoverDurationSeconds: number; // 12 seconds
  dataLossBytes: number; // 0 bytes
  status: "SUCCESSFUL_FAILOVER";
  timestamp: string;
}

export interface OfflineQueueReplayResult {
  totalQueuedTransactions: number;
  replayedCount: number;
  deduplicatedCount: number;
  status: "QUEUE_REPLAY_COMPLETE";
  replayedAt: string;
}

export interface FieldEncryptionResult {
  algorithm: "AES-256-GCM";
  encryptedCiphertext: string;
  initializationVectorIv: string;
  authTag: string;
  keyVersion: string;
}

export interface ZeroTrustEvalResult {
  accessGranted: boolean;
  officerId: string;
  mfaVerified: boolean;
  jurisdictionAuthorized: boolean;
  rationaleValid: boolean;
  denialReason?: string;
  evaluatedAt: string;
}

export interface VulnerabilityScanTestResult {
  testName: string;
  category: "SQL_INJECTION" | "XSS" | "PATH_TRAVERSAL" | "PRIVILEGE_ESCALATION";
  payloadTested: string;
  prevented: boolean;
  mitigationStrategy: string;
}

export interface VulnerabilityScanReport {
  totalScans: number;
  vulnerabilitiesFoundCount: number;
  overallSecurityRating: "A+" | "A" | "B" | "F";
  tests: VulnerabilityScanTestResult[];
  scannedAt: string;
}

export interface SystemHealthReport {
  status: SystemHealthStatus;
  version: string;
  uptimeSeconds: number;
  components: {
    database: { status: "UP" | "DOWN"; latencyMs: number };
    redis: { status: "UP" | "DOWN"; latencyMs: number };
    s3EvidenceVault: { status: "UP" | "DOWN"; latencyMs: number };
    auditLedgerIntegrity: { status: "INTACT" | "CORRUPTED" };
  };
  k8sClusterMetrics: {
    activePods: number;
    desiredPods: number;
    cpuUtilizationPercentage: number;
    memoryUtilizationPercentage: number;
  };
  timestamp: string;
}

export interface EdgeNodeSyncStatus {
  stateName: string;
  nodeId: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  lastSyncTimestamp: string;
  pendingOfflineTxCount: number;
}

export interface PatrolUnitTelemetry {
  unitId: string;
  unitCallsign: string;
  assignedOfficerId: string;
  assignedOfficerName: string;
  state: string;
  dutyStatus: string;
  latitude: number;
  longitude: number;
  speedKmH: number;
  lastTelemetryTimestamp: string;
}

export interface CadIncidentRecord {
  id: string;
  cadIncidentNumber: string;
  title: string;
  category: string;
  priority: IncidentPriority;
  locationName: string;
  state: string;
  latitude: number;
  longitude: number;
  status: CadDispatchStatus;
  dispatchedUnitId?: string;
  dispatchedUnitCallsign?: string;
  dispatchedAt?: string;
  reportedAt: string;
  createdAt: string;
}

export interface RecommendedPatrolUnit {
  unitId: string;
  unitCallsign: string;
  assignedOfficerName: string;
  distanceKm: number;
  dutyStatus: string;
  estimatedArrivalMinutes: number;
}

export interface PublicCrimeTipRecord {
  id: string;
  tipReferenceNumber: string;
  isAnonymous: boolean;
  reporterNin?: string;
  reporterName?: string;
  reporterPhone?: string;
  category: string;
  narrative: string;
  locationName: string;
  state: string;
  latitude?: number;
  longitude?: number;
  mediaAttachmentUrls: string[];
  submittedAt: string;
}

export interface PccApplicationRecord {
  id: string;
  trackingNumber: string;
  formNPF11Code: string;
  applicantNin: string;
  applicantName: string;
  email: string;
  phoneNumber: string;
  purpose: string;
  status: PccStatus;
  hasCriminalRecord: boolean;
  certificateHash?: string;
  qrVerificationUrl?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface StolenVehicleLookupResult {
  queryIdentifier: string;
  status: StolenVehicleStatus;
  makeModel?: string;
  color?: string;
  reportedStolenDate?: string;
  stolenLocation?: string;
  reportingStation?: string;
  instructions: string;
}

export interface NimcNinVerificationResult {
  nin: string;
  verificationStatus: AgencyVerificationStatus;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  photoUrl?: string;
  biometricReference: string;
  verifiedAt: string;
}

export interface FrscVerificationResult {
  licenseOrVinNumber: string;
  verificationStatus: AgencyVerificationStatus;
  driverName?: string;
  vehicleMakeModel?: string;
  plateNumber?: string;
  expiryDate: string;
  verifiedAt: string;
}

export interface InecVoterIdVerificationResult {
  voterVin: string;
  verificationStatus: AgencyVerificationStatus;
  voterName: string;
  pollingUnit: string;
  state: string;
  lga: string;
  verifiedAt: string;
}

export interface NisPassportVerificationResult {
  passportNumber: string;
  verificationStatus: AgencyVerificationStatus;
  holderName: string;
  nationality: string;
  expiryDate: string;
  borderWatchlistClearance: "CLEARED" | "WATCHLIST_ALERT";
  verifiedAt: string;
}

export interface CustodyTransferRecord {
  id: string;
  transferNumber: string;
  inmatePersonId: string;
  inmateName: string;
  originatingStation: string;
  targetNcosFacility: string;
  remandWarrantNumber: string;
  transferringOfficerId: string;
  receivingNcosOfficerId: string;
  remandStatus: RemandStatus;
  transferredAt: string;
  createdAt: string;
}

export interface CellCapacityRecord {
  facilityId: string;
  facilityName: string;
  state: string;
  designCapacity: number;
  currentOccupancy: number;
  occupancyPercentage: number;
  capacityStatus: CellCapacityStatus;
  overcrowdingAlertTriggered: boolean;
  lastUpdated: string;
}

export interface InmateMovementLogEntry {
  id: string;
  inmatePersonId: string;
  inmateName: string;
  movementType: InmateMovementType;
  fromLocation: string;
  toLocation: string;
  escortOfficerId: string;
  transportVehicleSerial: string;
  departureTime: string;
  arrivalTime?: string;
  status: "IN_TRANSIT" | "COMPLETED";
}

export interface ChargeSheetRecord {
  id: string;
  chargeSheetNumber: string;
  formNPF14Code: string;
  caseId: string;
  arrestId: string;
  suspectPersonId: string;
  suspectName: string;
  courtName: string;
  jurisdictionState: string;
  prosecutingOfficerId: string;
  statutoryCounts: Array<{ countNumber: number; penalCodeSection: string; offenseTitle: string; particularsOfOffense: string }>;
  evidenceHashesLinked: string[];
  courtSealNumber: string;
  trialStatus: TrialStatus;
  isJudiciallyLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JudicialOrderRecord {
  id: string;
  orderNumber: string;
  orderType: JudicialOrderType;
  issuingJudgeName: string;
  courtName: string;
  courtSealNumber: string;
  targetCaseId: string;
  targetArrestId?: string;
  summaryText: string;
  isJudiciallyLocked: boolean;
  effectiveDate: string;
  createdAt: string;
}

export interface JudicialSealVerificationResult {
  courtSealNumber: string;
  sealStatus: JudicialSealStatus;
  issuingJudgeName: string;
  courtName: string;
  jurisdictionState: string;
  verifiedAt: string;
}

export interface BiometricMatchCandidate {
  personId: string;
  personName: string;
  nin?: string;
  photoUrl?: string;
  matchConfidencePercentage: number;
}

export interface BiometricMatchResult {
  searchId: string;
  algorithmVersion: string;
  candidates: BiometricMatchCandidate[];
  requiresHumanVerification: true;
  humanVerificationStatus: BiometricVerificationStatus;
  humanVerifierOfficerId?: string;
  verifiedAt?: string;
  verificationNotes?: string;
}

export interface CrimeHeatmapPoint {
  lgaName: string;
  stateName: string;
  latitude: number;
  longitude: number;
  incidentCount: number;
  severity: HotspotSeverity;
  timeOfDayDistribution: { morning: number; afternoon: number; night: number; midnight: number };
}

export interface PredictiveTrendForecast {
  regionName: string;
  forecastedSurgeType: string;
  confidenceScorePercentage: number;
  recommendedPatrolDensity: string;
  modusOperandiCluster: string;
  seasonalPattern: string;
}

export interface ExecutiveCommandAnalytics {
  totalIncidents24h: number;
  totalArrests30d: number;
  activeWarrantsCount: number;
  capturedWantedCount: number;
  evidenceVaultTotalBytes: number;
  caseClosurePercentage: number;
  topIncidentState: string;
  stateBreakdown: Array<{ state: string; incidents: number; arrests: number }>;
}

export interface AuditLogEntry {
  id: string;
  sequenceIndex: number;
  timestamp: string;
  officerId: string;
  badgeNumber: string;
  officerRole: OfficerRole;
  ipAddress: string;
  deviceFingerprint: string;
  action: AuditActionType;
  resourceType: AuditResourceType;
  targetResourceId: string;
  justificationRationale: string;
  jurisdictionCode: string;
  complianceRiskScore: number;
  previousBlockHash: string;
  blockHash: string;
  tamperStatus: AuditTamperStatus;
  internalAffairsFlagged: boolean;
  createdAt: string;
}

export interface ComplianceSummaryReport {
  totalAuditLogs: number;
  chainIntegrityStatus: AuditTamperStatus;
  highRiskQueriesCount: number;
  internalAffairsEscalationsCount: number;
  unjustifiedQueriesCount: number;
  averageRiskScore: number;
}

export interface ConfidentialInformantRecord {
  id: string;
  pseudonymCodeName: string;
  encryptedTrueIdentity: string;
  handlerOfficerId: string;
  backupHandlerOfficerId?: string;
  reliabilityRating: string;
  status: InformantStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IntelligenceReportRecord {
  id: string;
  reportNumber: string;
  title: string;
  rawSummary: string;
  sourceReliability: SourceReliabilityRating;
  informationValidity: InformationValidityRating;
  evaluationCode: string;
  classification: ClassificationLevel;
  informantPseudonymId?: string;
  reportingOfficerId: string;
  targetCaseId?: string;
  targetIncidentId?: string;
  disseminationClearance: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterStateRecordRequest {
  id: string;
  requestNumber: string;
  originatingOfficerId: string;
  originatingState: string;
  targetState: string;
  recordType: InterStateRecordType;
  targetRecordId: string;
  justificationRationale: string;
  priority: InterStateRequestPriority;
  status: InterStateRequestStatus;
  approvingOfficerId?: string;
  approvedAt?: string;
  rejectionReason?: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyJurisdictionOverride {
  id: string;
  officerId: string;
  officerState: string;
  targetRecordId: string;
  targetRecordState: string;
  mandatoryRationale: string;
  timestamp: string;
  auditSeverity: "HIGH_ALERT_AUDIT_LOGGED";
  flaggedForNationalHq: boolean;
}

export interface NationalHqStateOversightSummary {
  stateName: string;
  totalOutgoingRequests: number;
  totalIncomingRequests: number;
  approvedCount: number;
  rejectedCount: number;
  emergencyOverridesCount: number;
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
