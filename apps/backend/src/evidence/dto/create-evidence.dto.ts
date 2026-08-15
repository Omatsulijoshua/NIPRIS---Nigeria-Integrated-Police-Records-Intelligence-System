import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EvidenceCategory, ClassificationLevel } from '@nipris/types';

export class CreateEvidenceDto {
  @ApiProperty({ example: 'Patrol Body-Camera Footage at Bank Vault Entrance', description: 'Evidence Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: EvidenceCategory, example: EvidenceCategory.BODYCAM_FOOTAGE })
  @IsEnum(EvidenceCategory)
  category: EvidenceCategory;

  @ApiProperty({ example: 'bodycam-rec-20260815-0012.mp4', description: 'Original File Name' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ example: 450971520, description: 'File Size in Bytes' })
  @IsNumber()
  fileSizeBytes: number;

  @ApiProperty({ example: 'video/mp4', description: 'MIME Type' })
  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @ApiProperty({ example: 'https://s3.nipris.gov.ng/vault/cam-9912.mp4', description: 'Vault Storage URL' })
  @IsString()
  @IsNotEmpty()
  storageUrl: string;

  @ApiProperty({ example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', description: 'SHA-256 Checksum Hash' })
  @IsString()
  @IsNotEmpty()
  sha256Hash: string;

  @ApiProperty({ example: 'inc-edo-001', description: 'Associated Incident ID', required: false })
  @IsOptional()
  @IsString()
  incidentId?: string;

  @ApiProperty({ example: 'cas-edo-001', description: 'Associated Case ID', required: false })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiProperty({ example: 'person-chidi-001', description: 'Associated Person Master ID', required: false })
  @IsOptional()
  @IsString()
  personId?: string;

  @ApiProperty({ example: 'Ring Road Financial District, Benin City', description: 'Seizure Location' })
  @IsString()
  @IsNotEmpty()
  seizedLocation: string;

  @ApiProperty({ example: '2026-08-15T00:25:00.000Z', description: 'Seizure Timestamp' })
  @IsString()
  @IsNotEmpty()
  seizedAt: string;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.EVIDENCE_RESTRICTED })
  @IsOptional()
  @IsEnum(ClassificationLevel)
  classification?: ClassificationLevel;
}
