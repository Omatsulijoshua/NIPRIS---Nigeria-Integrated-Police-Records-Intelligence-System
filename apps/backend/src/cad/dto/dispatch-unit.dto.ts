import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DispatchUnitDto {
  @ApiProperty({ example: 'CAD-2026-EDO-00912', description: 'CAD Incident Number' })
  @IsString()
  @IsNotEmpty()
  cadIncidentNumber: string;

  @ApiProperty({ example: 'unit-edo-patrol-01', description: 'Target Patrol Unit ID to Dispatch' })
  @IsString()
  @IsNotEmpty()
  unitId: string;
}
