import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BiometricVerificationStatus } from '@nipris/types';

export class BiometricVerifyDto {
  @ApiProperty({ example: 'bio_search_9912', description: 'Biometric Search Request ID' })
  @IsString()
  @IsNotEmpty()
  searchId: string;

  @ApiProperty({ enum: BiometricVerificationStatus, example: BiometricVerificationStatus.VERIFIED_MATCH })
  @IsEnum(BiometricVerificationStatus)
  status: BiometricVerificationStatus;

  @ApiProperty({ example: 'Human officer confirmed scar alignment and ear geometry match with NIN photo reference.', description: 'Human Verifier Notes' })
  @IsString()
  @IsNotEmpty()
  verificationNotes: string;
}
