import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BailStatus, CustodyStatus } from '@nipris/types';

export class UpdateBailDto {
  @ApiProperty({ enum: BailStatus, example: BailStatus.BAIL_GRANTED })
  @IsEnum(BailStatus)
  bailStatus: BailStatus;

  @ApiProperty({ enum: CustodyStatus, example: CustodyStatus.BAIL_GRANTED })
  @IsEnum(CustodyStatus)
  custodyStatus: CustodyStatus;

  @ApiProperty({ example: 'Bail bond of N2,000,000 satisfied with two Level 14 civil servant sureties', description: 'Bail Conditions / Notes' })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({ example: '2026-08-15T02:00:00.000Z', description: 'Release Timestamp', required: false })
  @IsOptional()
  @IsString()
  releaseDate?: string;
}
