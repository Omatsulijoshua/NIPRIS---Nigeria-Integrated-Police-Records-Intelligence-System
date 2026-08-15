import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TrialStatus } from '@nipris/types';

export class SyncCourtStatusDto {
  @ApiProperty({ example: 'CS-2026-EDO-00912', description: 'Charge Sheet Number' })
  @IsString()
  @IsNotEmpty()
  chargeSheetNumber: string;

  @ApiProperty({ enum: TrialStatus, example: TrialStatus.TRIAL_IN_PROGRESS })
  @IsEnum(TrialStatus)
  trialStatus: TrialStatus;

  @ApiProperty({ example: 'Plea taken. Defendant pleaded Not Guilty. Trial adjourned to September 15, 2026.', description: 'Status Update Details' })
  @IsString()
  @IsNotEmpty()
  details: string;
}
