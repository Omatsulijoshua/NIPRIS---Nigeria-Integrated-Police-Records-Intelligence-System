import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CaseStatus } from '@nipris/types';

export class UpdateCaseStatusDto {
  @ApiProperty({ enum: CaseStatus, example: CaseStatus.PENDING_PROSECUTION })
  @IsEnum(CaseStatus)
  status: CaseStatus;

  @ApiProperty({ example: 'Investigation completed. Comprehensive case file submitted to State DPP for prosecution.', description: 'Status Transition Justification' })
  @IsString()
  @IsNotEmpty()
  statusReason: string;
}
