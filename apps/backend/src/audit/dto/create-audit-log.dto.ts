import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuditActionType, AuditResourceType, OfficerRole } from '@nipris/types';

export class CreateAuditLogDto {
  @ApiProperty({ example: 'off-patrol-edo', description: 'Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'NPF-2002', description: 'Badge Number' })
  @IsString()
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ enum: OfficerRole, example: OfficerRole.INVESTIGATING_OFFICER })
  @IsEnum(OfficerRole)
  officerRole: OfficerRole;

  @ApiProperty({ example: '102.89.41.109', description: 'Client IP Address' })
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @ApiProperty({ example: 'FP-99812-EDO-DEVICE', description: 'Device Fingerprint' })
  @IsString()
  @IsNotEmpty()
  deviceFingerprint: string;

  @ApiProperty({ enum: AuditActionType, example: AuditActionType.VIEW_RECORD })
  @IsEnum(AuditActionType)
  action: AuditActionType;

  @ApiProperty({ enum: AuditResourceType, example: AuditResourceType.PERSON })
  @IsEnum(AuditResourceType)
  resourceType: AuditResourceType;

  @ApiProperty({ example: 'person-chidi-001', description: 'Target Resource ID' })
  @IsString()
  @IsNotEmpty()
  targetResourceId: string;

  @ApiProperty({ example: 'Verification of NIN for criminal suspect booking NPF 14', description: 'Operational Purpose Justification' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;

  @ApiProperty({ example: 'EDO', description: 'Jurisdiction State Code' })
  @IsString()
  @IsNotEmpty()
  jurisdictionCode: string;
}
