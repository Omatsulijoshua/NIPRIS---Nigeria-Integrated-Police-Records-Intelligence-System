import { IsNotEmpty, IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClassificationLevel } from '@nipris/types';

export class CreatePersonDto {
  @ApiProperty({ example: '12345678901', description: 'National Identity Number (NIN)', required: false })
  @IsOptional()
  @IsString()
  nin?: string;

  @ApiProperty({ example: 'Chidi', description: 'First Name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Okonkwo', description: 'Last Name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Emeka', description: 'Middle Name', required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: ['"Chidi the Cobra"', '"Emeso"'], description: 'Known Aliases', required: false })
  @IsOptional()
  @IsArray()
  aliases?: string[];

  @ApiProperty({ example: '1992-05-14', description: 'Date of Birth (YYYY-MM-DD)' })
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ example: 'Male', description: 'Sex' })
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({ example: 'Nigerian', description: 'Nationality' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({ example: 'https://s3.nipris.gov.ng/photos/person-99.jpg', description: 'Photograph URL', required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({ example: 'bio_ref_sha256_99887766554433221100', description: 'Biometric Reference Hash', required: false })
  @IsOptional()
  @IsString()
  biometricRef?: string;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED })
  @IsOptional()
  @IsEnum(ClassificationLevel)
  classification?: ClassificationLevel;
}
