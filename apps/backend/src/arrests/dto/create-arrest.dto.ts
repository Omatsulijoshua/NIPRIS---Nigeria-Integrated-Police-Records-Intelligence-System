import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArrestDto {
  @ApiProperty({ example: 'person-chidi-001', description: 'Person Master ID' })
  @IsString()
  @IsNotEmpty()
  personId: string;

  @ApiProperty({ example: 'inc-edo-001', description: 'Associated Incident ID', required: false })
  @IsOptional()
  @IsString()
  incidentId?: string;

  @ApiProperty({ example: 'org-edo-station-a', description: 'Arresting Police Station ID' })
  @IsString()
  @IsNotEmpty()
  arrestingStationId: string;

  @ApiProperty({ example: 'Edo', description: 'State Command Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '2026-08-15T00:40:00.000Z', description: 'Arrest Timestamp' })
  @IsString()
  @IsNotEmpty()
  arrestedAt: string;

  @ApiProperty({ example: 'Ring Road Financial District, Benin City', description: 'Arrest Location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Reasonable suspicion and armed robbery warrant execution', description: 'Legal Basis for Arrest' })
  @IsString()
  @IsNotEmpty()
  legalBasis: string;

  @ApiProperty({ example: ['Armed Robbery (Section 402 Criminal Code)', 'Illegal Possession of Firearms'], description: 'Booking Charges' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  charges: string[];

  @ApiProperty({ example: 'Benin Central Station Lockup Cell 3', description: 'Custody Location' })
  @IsString()
  @IsNotEmpty()
  custodyLocation: string;
}
