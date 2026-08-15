import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LegalStatus } from '@nipris/types';

export class UpdateLegalStatusDto {
  @ApiProperty({ enum: LegalStatus, example: LegalStatus.CHARGE, description: 'Updated Legal Status (ARREST, CHARGE, PROSECUTION, CONVICTION, ACQUITTAL, DISMISSED, RELEASED)' })
  @IsEnum(LegalStatus)
  legalStatus: LegalStatus;

  @ApiProperty({ example: 'Formal charges filed at Magistrate Court 2, Benin City', description: 'Legal Basis / Court Order Justification' })
  @IsString()
  @IsNotEmpty()
  statusReason: string;

  @ApiProperty({ example: 'CR/2026/BENIN/881', description: 'Court / Case Reference Code', required: false })
  @IsOptional()
  @IsString()
  caseReference?: string;
}
