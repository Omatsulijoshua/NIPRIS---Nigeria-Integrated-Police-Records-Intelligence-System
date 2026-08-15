import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationVisitorDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'Barrister Nnamdi Kanu', description: 'Visitor Full Name' })
  @IsString()
  @IsNotEmpty()
  visitorName: string;

  @ApiProperty({ example: 'NIN-99201920192', description: 'National Identity Number or ID Ref' })
  @IsString()
  @IsNotEmpty()
  identificationRef: string;

  @ApiProperty({ example: 'DETAINEE_VISIT', description: 'Reason for Visit (COMPLAINT_FILING, DETAINEE_VISIT, LEGAL_COUNSEL, ADMINISTRATIVE)' })
  @IsString()
  @IsNotEmpty()
  visitReason: string;

  @ApiProperty({ example: 'per_edo_suspect_01', description: 'Target Detainee Person ID if visiting inmate' })
  @IsString()
  @IsOptional()
  targetDetaineeId?: string;

  @ApiProperty({ example: 'BDG-045', description: 'Issued Station Visitor Badge Number' })
  @IsString()
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ example: true, description: 'Contraband Security Screening Cleared' })
  @IsBoolean()
  @IsOptional()
  securityCleared?: boolean;
}
