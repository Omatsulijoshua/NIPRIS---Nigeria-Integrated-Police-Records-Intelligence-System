import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShiftType } from '@nipris/types';

export class CreateDutyShiftDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ enum: ShiftType, example: ShiftType.DAY, description: 'Shift Category Type' })
  @IsEnum(ShiftType)
  @IsNotEmpty()
  shiftType: ShiftType;

  @ApiProperty({ example: 'Morning Patrol Shift Alpha', description: 'Shift Display Name' })
  @IsString()
  @IsNotEmpty()
  shiftName: string;

  @ApiProperty({ example: '08:00', description: 'Start Time (HH:mm)' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '16:00', description: 'End Time (HH:mm)' })
  @IsString()
  @IsNotEmpty()
  endTime: string;
}
