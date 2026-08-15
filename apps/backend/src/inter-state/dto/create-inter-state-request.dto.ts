import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InterStateRecordType, InterStateRequestPriority } from '@nipris/types';

export class CreateInterStateRequestDto {
  @ApiProperty({ example: 'Edo', description: 'Originating Officer State' })
  @IsString()
  @IsNotEmpty()
  originatingState: string;

  @ApiProperty({ example: 'Lagos', description: 'Target State Command Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  targetState: string;

  @ApiProperty({ enum: InterStateRecordType, example: InterStateRecordType.CRIMINAL_ARREST })
  @IsEnum(InterStateRecordType)
  recordType: InterStateRecordType;

  @ApiProperty({ example: 'ARR-2026-LAGOS-00891', description: 'Target Record Number / ID' })
  @IsString()
  @IsNotEmpty()
  targetRecordId: string;

  @ApiProperty({ example: 'Joint armed robbery investigation link across Benin-Lagos transport corridor', description: 'Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;

  @ApiProperty({ enum: InterStateRequestPriority, example: InterStateRequestPriority.URGENT })
  @IsOptional()
  @IsEnum(InterStateRequestPriority)
  priority?: InterStateRequestPriority;
}
