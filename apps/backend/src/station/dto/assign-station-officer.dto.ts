import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OfficerRole } from '@nipris/types';

export class AssignStationOfficerDto {
  @ApiProperty({ example: 'off_patrol_edo_001', description: 'Officer ID to assign' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'stn_edo_001', description: 'Target Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'unit_cid_01', description: 'Internal Station Unit ID' })
  @IsString()
  @IsOptional()
  unitId?: string;

  @ApiProperty({ enum: OfficerRole, example: OfficerRole.DESK_OFFICER, description: 'Assigned Station Role' })
  @IsEnum(OfficerRole)
  @IsNotEmpty()
  stationRole: OfficerRole;
}
