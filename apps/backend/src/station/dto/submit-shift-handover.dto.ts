import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitShiftHandoverDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'sft_eve_01', description: 'Shift ID Outgoing' })
  @IsString()
  @IsNotEmpty()
  outgoingShiftId: string;

  @ApiProperty({ example: 'off_commander_edo', description: 'Outgoing Watch Commander Officer ID' })
  @IsString()
  @IsNotEmpty()
  outgoingCommanderId: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Incoming Watch Commander Officer ID' })
  @IsString()
  @IsNotEmpty()
  incomingCommanderId: string;

  @ApiProperty({ example: 12, description: 'Detainees Count currently in cell' })
  @IsNumber()
  @IsNotEmpty()
  detaineesCount: number;

  @ApiProperty({ example: 5, description: 'Open Critical Incidents Count' })
  @IsNumber()
  @IsNotEmpty()
  openIncidentsCount: number;

  @ApiProperty({ example: 'All cell locks verified. Patrol Hilux NPF-EDO-001 returned cleanly.', description: 'Handover Summary Notes' })
  @IsString()
  @IsNotEmpty()
  handoverNotes: string;

  @ApiProperty({ example: ['INC-2026-EDO-00912'], description: 'Pending Action Incident References' })
  @IsArray()
  @IsOptional()
  pendingIncidentRefs?: string[];
}
