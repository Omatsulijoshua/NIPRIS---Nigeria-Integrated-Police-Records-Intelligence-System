import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OperationalStatus } from '@nipris/types';

export class ClockInAttendanceDto {
  @ApiProperty({ example: 'off_patrol_001', description: 'Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'sft_morning_01', description: 'Assigned Shift ID' })
  @IsString()
  @IsOptional()
  shiftId?: string;

  @ApiProperty({ enum: OperationalStatus, example: OperationalStatus.ON_DUTY, description: 'Operational Status upon Clock-in' })
  @IsEnum(OperationalStatus)
  @IsNotEmpty()
  operationalStatus: OperationalStatus;

  @ApiProperty({ example: 'Clocked in at front counter terminal', description: 'Attendance Notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
