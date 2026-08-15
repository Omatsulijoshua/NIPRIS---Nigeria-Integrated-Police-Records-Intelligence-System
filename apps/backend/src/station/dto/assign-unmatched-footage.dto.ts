import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignUnmatchedFootageDto {
  @ApiProperty({ example: 'ftg_unmatched_001', description: 'Footage Upload Record ID' })
  @IsString()
  @IsNotEmpty()
  footageId: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Assigned Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'INC-2026-EDO-00912', description: 'Linked Incident ID' })
  @IsString()
  @IsOptional()
  incidentId?: string;

  @ApiProperty({ example: 'CAS-2026-EDO-00912', description: 'Linked Case ID' })
  @IsString()
  @IsOptional()
  caseId?: string;
}
