import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RetentionPolicy, ClassificationLevel } from '@nipris/types';

export class TelemetryPointDto {
  @ApiProperty({ example: 6.335 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 5.603 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 42.5 })
  @IsNumber()
  speedKmH: number;

  @ApiProperty({ example: '2026-08-15T00:15:00.000Z' })
  @IsString()
  timestamp: string;

  @ApiProperty({ example: 'ON_PATROL' })
  @IsString()
  dutyStatus: string;
}

export class TimeSyncMarkerDto {
  @ApiProperty({ example: 124, description: 'Timestamp in seconds from start' })
  @IsNumber()
  timestampSeconds: number;

  @ApiProperty({ example: 'WEAPON_DRAWN' })
  @IsString()
  tag: 'FORCE_USED' | 'WEAPON_DRAWN' | 'TRAFFIC_STOP' | 'ARREST_MADE' | 'OFFICER_ASSISTANCE';

  @ApiProperty({ example: 'Suspect brandished knife during vault perimeter check', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateRecordingDto {
  @ApiProperty({ example: 'BWC-NPF-EDO-0012', description: 'Device Serial Number' })
  @IsString()
  @IsNotEmpty()
  deviceSerial: string;

  @ApiProperty({ example: 'inc-edo-001', description: 'Associated Incident ID', required: false })
  @IsOptional()
  @IsString()
  incidentId?: string;

  @ApiProperty({ example: 'cas-edo-001', description: 'Associated Case ID', required: false })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiProperty({ example: '2026-08-15T00:10:00.000Z', description: 'Start Timestamp' })
  @IsString()
  @IsNotEmpty()
  startTimestamp: string;

  @ApiProperty({ example: '2026-08-15T00:40:00.000Z', description: 'End Timestamp' })
  @IsString()
  @IsNotEmpty()
  endTimestamp: string;

  @ApiProperty({ example: 1800, description: 'Duration in seconds' })
  @IsNumber()
  durationSeconds: number;

  @ApiProperty({ example: 985000000, description: 'File size in bytes' })
  @IsNumber()
  fileSizeBytes: number;

  @ApiProperty({ example: 'https://s3.nipris.gov.ng/bodycam/rec-9912.mp4', description: 'Stream URL' })
  @IsString()
  @IsNotEmpty()
  streamUrl: string;

  @ApiProperty({ example: 'd41d8cd98f00b204e9800998ecf8427e991288aa77bb66cc55dd44ee33ff2211', description: 'SHA-256 Checksum' })
  @IsString()
  @IsNotEmpty()
  sha256Hash: string;

  @ApiProperty({ type: [TelemetryPointDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TelemetryPointDto)
  telemetryTrack?: TelemetryPointDto[];

  @ApiProperty({ type: [TimeSyncMarkerDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSyncMarkerDto)
  markerTags?: TimeSyncMarkerDto[];

  @ApiProperty({ enum: RetentionPolicy, example: RetentionPolicy.AUTOMATIC_PURGE_90_DAYS })
  @IsOptional()
  @IsEnum(RetentionPolicy)
  retentionPolicy?: RetentionPolicy;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.EVIDENCE_RESTRICTED })
  @IsOptional()
  @IsEnum(ClassificationLevel)
  classification?: ClassificationLevel;
}
