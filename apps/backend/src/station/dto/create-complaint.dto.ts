import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'Chief Emeka Nnamdi', description: 'Complainant Full Name' })
  @IsString()
  @IsNotEmpty()
  complainantName: string;

  @ApiProperty({ example: '+234-803-555-0192', description: 'Complainant Phone Contact' })
  @IsString()
  @IsOptional()
  complainantPhone?: string;

  @ApiProperty({ example: 'per_edo_001', description: 'Complainant PersonMaster ID if registered' })
  @IsString()
  @IsOptional()
  complainantPersonId?: string;

  @ApiProperty({ example: 'WALK_IN_CITIZEN', description: 'Complaint Origin Source (WALK_IN_CITIZEN, PHONE, ONLINE_REFERRAL, OFFICER, OTHER_STATION)' })
  @IsString()
  @IsNotEmpty()
  originSource: string;

  @ApiProperty({ example: 'ARMED_ROBBERY', description: 'Complaint Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Complainant states armed robbers invaded premises along Ring Road at 02:00 hours.', description: 'Detailed Complaint Narrative' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Ring Road, Benin City, Edo State', description: 'Incident Location Name' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Receiving Officer ID' })
  @IsString()
  @IsNotEmpty()
  receivingOfficerId: string;
}
