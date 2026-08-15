import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OperationalStatus } from '@nipris/types';

export class UpdateOfficerStatusDto {
  @ApiProperty({ example: 'off_patrol_001', description: 'Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ enum: OperationalStatus, example: OperationalStatus.ON_PATROL, description: 'New Operational Duty Status' })
  @IsEnum(OperationalStatus)
  @IsNotEmpty()
  operationalStatus: OperationalStatus;
}
