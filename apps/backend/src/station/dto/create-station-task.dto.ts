import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationTaskDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'Conduct Crime Scene Canvas at Ring Road', description: 'Task Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Interview shop owners and secure CCTV footage from Bank of Industry.', description: 'Task Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Assigned Officer ID' })
  @IsString()
  @IsNotEmpty()
  assignedOfficerId: string;

  @ApiProperty({ example: 'HIGH', description: 'Task Priority (LOW, NORMAL, HIGH, URGENT)' })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ example: '2026-08-16T18:00:00Z', description: 'Due Date ISO Timestamp' })
  @IsString()
  @IsOptional()
  dueDate?: string;
}
