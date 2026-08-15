import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryEntryDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Recording Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'COMPLAINT_RECEIVED', description: 'Event Type (Complaint, Arrest, Release, Patrol Departure, Patrol Return, Incident, Visitor, Evidence)' })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({ example: 'Walk-in citizen Chief Emeka Nnamdi reported armed robbery incident at Ring Road.', description: 'Detailed Operational Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'inc_edo_001', description: 'Linked Incident ID' })
  @IsString()
  @IsOptional()
  incidentId?: string;

  @ApiProperty({ example: 'cas_edo_001', description: 'Linked Case ID' })
  @IsString()
  @IsOptional()
  caseId?: string;

  @ApiProperty({ example: 'per_edo_001', description: 'Linked Person ID' })
  @IsString()
  @IsOptional()
  personId?: string;

  @ApiProperty({ example: 'veh_edo_001', description: 'Linked Vehicle ID' })
  @IsString()
  @IsOptional()
  vehicleId?: string;

  @ApiProperty({ example: 'evd_edo_001', description: 'Linked Evidence ID' })
  @IsString()
  @IsOptional()
  evidenceId?: string;

  @ApiProperty({ example: ['https://nipris.police.gov.ng/uploads/photo1.jpg'], description: 'Attachment URLs' })
  @IsArray()
  @IsOptional()
  attachments?: string[];
}
