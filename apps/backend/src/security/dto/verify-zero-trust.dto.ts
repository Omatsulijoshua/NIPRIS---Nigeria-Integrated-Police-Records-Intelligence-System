import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyZeroTrustDto {
  @ApiProperty({ example: 'off-patrol-edo', description: 'Requesting Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: true, description: 'Whether Officer has completed Multi-Factor Authentication (MFA)' })
  @IsBoolean()
  mfaVerified: boolean;

  @ApiProperty({ example: 'Edo', description: 'Officer Jurisdiction State' })
  @IsString()
  @IsNotEmpty()
  officerState: string;

  @ApiProperty({ example: 'Edo', description: 'Target Record Jurisdiction State' })
  @IsString()
  @IsNotEmpty()
  targetRecordState: string;

  @ApiProperty({ example: 'Investigative search for suspect booking NPF 14', description: 'Operational Purpose Justification' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
