import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RetentionPolicy } from '@nipris/types';

export class UpdateRetentionDto {
  @ApiProperty({ enum: RetentionPolicy, example: RetentionPolicy.EVIDENTIARY_HOLD_PERMANENT })
  @IsEnum(RetentionPolicy)
  retentionPolicy: RetentionPolicy;

  @ApiProperty({ example: 'Tagged for active homicide & bank robbery court trial evidence hold', description: 'Tagging Reason' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
