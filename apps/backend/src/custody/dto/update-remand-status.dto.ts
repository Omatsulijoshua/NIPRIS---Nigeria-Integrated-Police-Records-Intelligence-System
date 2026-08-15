import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RemandStatus } from '@nipris/types';

export class UpdateRemandStatusDto {
  @ApiProperty({ example: 'TRF-2026-NCOS-00812', description: 'Custody Transfer Number' })
  @IsString()
  @IsNotEmpty()
  transferNumber: string;

  @ApiProperty({ enum: RemandStatus, example: RemandStatus.SERVING_SENTENCE })
  @IsEnum(RemandStatus)
  remandStatus: RemandStatus;

  @ApiProperty({ example: 'Court convicted defendant to 5 years custodial sentence at NCoS Benin Facility', description: 'Remand Sentence Details' })
  @IsString()
  @IsNotEmpty()
  details: string;
}
