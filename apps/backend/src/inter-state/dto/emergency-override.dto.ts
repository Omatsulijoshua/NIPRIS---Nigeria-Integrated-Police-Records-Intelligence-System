import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmergencyOverrideDto {
  @ApiProperty({ example: 'ARR-2026-LAGOS-00891', description: 'Target Record ID' })
  @IsString()
  @IsNotEmpty()
  targetRecordId: string;

  @ApiProperty({ example: 'Lagos', description: 'Target State Command Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  targetRecordState: string;

  @ApiProperty({ example: 'Active hot pursuit of armed bank robbery fugitive fleeing across Ore-Benin boundary', description: 'Mandatory Emergency Rationale' })
  @IsString()
  @IsNotEmpty()
  mandatoryRationale: string;
}
