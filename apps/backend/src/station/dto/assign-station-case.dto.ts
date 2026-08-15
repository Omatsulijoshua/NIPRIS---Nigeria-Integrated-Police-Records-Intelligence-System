import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignStationCaseDto {
  @ApiProperty({ example: 'cas_edo_001', description: 'Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: 'off_cid_001', description: 'Lead Investigating Officer ID' })
  @IsString()
  @IsNotEmpty()
  leadOfficerId: string;

  @ApiProperty({ example: ['off_patrol_001'], description: 'Assigned Team Member Officer IDs' })
  @IsArray()
  @IsOptional()
  teamOfficerIds?: string[];

  @ApiProperty({ example: 'off_commander_edo', description: 'Supervising Officer ID' })
  @IsString()
  @IsOptional()
  supervisorOfficerId?: string;
}
