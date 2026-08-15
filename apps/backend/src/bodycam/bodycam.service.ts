import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRetentionDto } from './dto/update-retention.dto';
import { ApplyRedactionDto } from './dto/apply-redaction.dto';
import {
  CameraDevice,
  DeviceStatus,
  BodycamRecordingRecord,
  RetentionPolicy,
  RedactionStatus,
  ClassificationLevel,
} from '@nipris/types';

@Injectable()
export class BodycamService {
  private readonly logger = new Logger(BodycamService.name);
  private readonly devicesStore = new Map<string, CameraDevice>();
  private readonly recordingsStore = new Map<string, BodycamRecordingRecord>();

  constructor() {
    this.seedDevelopmentBodycam();
  }

  private seedDevelopmentBodycam() {
    const seedDevice: CameraDevice = {
      id: 'dev-bwc-001',
      deviceSerial: 'BWC-NPF-EDO-0012',
      model: 'Axon Body 3 / Patrol Cam V2',
      deviceType: 'BODY_WORN_CAMERA' as any,
      orgId: 'org-edo-station-a',
      assignedOfficerId: 'off-patrol-edo',
      status: DeviceStatus.IN_SERVICE,
      batteryPercentage: 94,
      availableStorageBytes: 64000000000,
      lastSyncTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.devicesStore.set(seedDevice.id, seedDevice);

    const seedRecording: BodycamRecordingRecord = {
      id: 'rec-edo-001',
      recordingNumber: 'BWC-2026-EDO-00991',
      deviceSerial: 'BWC-NPF-EDO-0012',
      officerId: 'off-patrol-edo',
      officerName: 'Inspector Emmanuel Okafor (NPF-2002)',
      incidentId: 'inc-edo-001',
      caseId: 'cas-edo-001',
      startTimestamp: new Date(Date.now() - 3600000).toISOString(),
      endTimestamp: new Date().toISOString(),
      durationSeconds: 1800,
      fileSizeBytes: 985000000,
      streamUrl: 'https://s3.nipris.gov.ng/bodycam/rec-9912.mp4',
      sha256Hash: 'd41d8cd98f00b204e9800998ecf8427e991288aa77bb66cc55dd44ee33ff2211',
      telemetryTrack: [
        { latitude: 6.335, longitude: 5.603, speedKmH: 42.5, timestamp: new Date(Date.now() - 3600000).toISOString(), dutyStatus: 'ON_PATROL' },
        { latitude: 6.336, longitude: 5.604, speedKmH: 0.0, timestamp: new Date(Date.now() - 1800000).toISOString(), dutyStatus: 'ON_SCENE' },
      ],
      markerTags: [
        { id: 'mk-001', timestampSeconds: 240, tag: 'WEAPON_DRAWN', notes: 'Suspect brandished firearm at bank rear entrance' },
        { id: 'mk-002', timestampSeconds: 610, tag: 'ARREST_MADE', notes: 'Primary suspect subdued and handcuffed' },
      ],
      retentionPolicy: RetentionPolicy.EVIDENTIARY_HOLD_PERMANENT,
      redactionStatus: RedactionStatus.UNREDACTED,
      classification: ClassificationLevel.EVIDENCE_RESTRICTED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.recordingsStore.set(seedRecording.id, seedRecording);
  }

  // --- DEVICE FLEET ---

  async registerDevice(dto: CreateDeviceDto): Promise<CameraDevice> {
    const newDevice: CameraDevice = {
      id: `dev_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      deviceSerial: dto.deviceSerial,
      model: dto.model,
      deviceType: dto.deviceType,
      orgId: dto.orgId,
      assignedOfficerId: dto.assignedOfficerId,
      status: dto.assignedOfficerId ? DeviceStatus.ASSIGNED : DeviceStatus.UNASSIGNED,
      batteryPercentage: 100,
      availableStorageBytes: 128000000000,
      lastSyncTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.devicesStore.set(newDevice.id, newDevice);
    this.logger.log(`Registered Camera Device: ${newDevice.deviceSerial} (${newDevice.model})`);
    return newDevice;
  }

  async assignDevice(id: string, officerId: string): Promise<CameraDevice> {
    const device = this.devicesStore.get(id);
    if (!device) throw new NotFoundException(`Camera Device '${id}' not found.`);
    device.assignedOfficerId = officerId;
    device.status = DeviceStatus.IN_SERVICE;
    device.updatedAt = new Date().toISOString();
    this.devicesStore.set(id, device);
    this.logger.log(`Assigned Device ${device.deviceSerial} to Officer ${officerId}`);
    return device;
  }

  // --- RECORDINGS INGEST & PLAYBACK ---

  async ingestRecording(dto: CreateRecordingDto, officerId: string): Promise<BodycamRecordingRecord> {
    const recordingNumber = `BWC-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;

    const newRecording: BodycamRecordingRecord = {
      id: `rec_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      recordingNumber,
      deviceSerial: dto.deviceSerial,
      officerId,
      incidentId: dto.incidentId,
      caseId: dto.caseId,
      startTimestamp: dto.startTimestamp,
      endTimestamp: dto.endTimestamp,
      durationSeconds: dto.durationSeconds,
      fileSizeBytes: dto.fileSizeBytes,
      streamUrl: dto.streamUrl,
      sha256Hash: dto.sha256Hash,
      telemetryTrack: (dto.telemetryTrack as any) || [],
      markerTags: (dto.markerTags as any) || [],
      retentionPolicy: dto.retentionPolicy || RetentionPolicy.AUTOMATIC_PURGE_90_DAYS,
      redactionStatus: RedactionStatus.UNREDACTED,
      classification: dto.classification || ClassificationLevel.EVIDENCE_RESTRICTED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.recordingsStore.set(newRecording.id, newRecording);
    this.logger.log(`Ingested Recording ${newRecording.recordingNumber} from Device ${newRecording.deviceSerial}`);
    return newRecording;
  }

  async getAllRecordings(officerId?: string, retention?: RetentionPolicy): Promise<BodycamRecordingRecord[]> {
    let list = Array.from(this.recordingsStore.values());
    if (officerId) list = list.filter((r) => r.officerId === officerId);
    if (retention) list = list.filter((r) => r.retentionPolicy === retention);
    return list;
  }

  async getRecordingById(id: string): Promise<BodycamRecordingRecord> {
    const rec = this.recordingsStore.get(id);
    if (!rec) throw new NotFoundException(`Bodycam Recording '${id}' not found.`);
    return rec;
  }

  async updateRetentionPolicy(id: string, dto: UpdateRetentionDto): Promise<BodycamRecordingRecord> {
    const rec = await this.getRecordingById(id);
    const previous = rec.retentionPolicy;
    rec.retentionPolicy = dto.retentionPolicy;
    rec.updatedAt = new Date().toISOString();
    this.recordingsStore.set(id, rec);
    this.logger.warn(`Updated Recording ${rec.recordingNumber} Retention Policy: ${previous} -> ${dto.retentionPolicy} (${dto.reason})`);
    return rec;
  }

  async applyRedaction(id: string, dto: ApplyRedactionDto): Promise<BodycamRecordingRecord> {
    const rec = await this.getRecordingById(id);
    rec.redactionStatus = RedactionStatus.REDACTION_APPLIED;
    rec.updatedAt = new Date().toISOString();
    this.recordingsStore.set(id, rec);
    this.logger.log(`Applied Redaction Filters [${dto.redactionFilters.join(', ')}] to Recording ${rec.recordingNumber}`);
    return rec;
  }
}
