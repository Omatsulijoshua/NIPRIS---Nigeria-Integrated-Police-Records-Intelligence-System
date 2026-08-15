import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportMaintenanceDefectDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'veh_001', description: 'Linked Vehicle or Equipment ID' })
  @IsString()
  @IsNotEmpty()
  targetId: string;

  @ApiProperty({ example: 'VEHICLE', description: 'Target Category (VEHICLE, FIREARM, RADIO_COMMUNICATION, ARMOR, TACTICAL_GEAR)' })
  @IsString()
  @IsNotEmpty()
  targetCategory: string;

  @ApiProperty({ example: 'Front right brake pad severely worn. Requires replacement.', description: 'Defect / Damage Narrative' })
  @IsString()
  @IsNotEmpty()
  defectNarrative: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Reporting Officer ID' })
  @IsString()
  @IsNotEmpty()
  reportingOfficerId: string;
}
