import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolveIdentityDto {
  @ApiProperty({ example: 'Chidi', description: 'First Name', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Okonkwo', description: 'Last Name', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '1992-05-14', description: 'Date of Birth (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiProperty({ example: '12345678901', description: 'NIN Identifier', required: false })
  @IsOptional()
  @IsString()
  nin?: string;

  @ApiProperty({ example: 'bio_ref_sha256_99887766554433221100', description: 'Biometric Reference Template', required: false })
  @IsOptional()
  @IsString()
  biometricRef?: string;

  @ApiProperty({ example: 'Fingerprint match verification for custody booking', description: 'Operational Purpose' })
  @IsString()
  @IsNotEmpty()
  operationalPurpose: string;
}
