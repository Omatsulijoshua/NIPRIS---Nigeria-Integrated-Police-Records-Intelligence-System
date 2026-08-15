import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyPccDto {
  @ApiProperty({ example: '10928374829', description: 'Applicant 11-Digit NIN' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  applicantNin: string;

  @ApiProperty({ example: 'Chidi Okonkwo', description: 'Applicant Full Name' })
  @IsString()
  @IsNotEmpty()
  applicantName: string;

  @ApiProperty({ example: 'applicant@domain.com', description: 'Applicant Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+2348012345678', description: 'Applicant Phone Number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'International Employment Visa & Background Clearance', description: 'Purpose of Clearance Certificate' })
  @IsString()
  @IsNotEmpty()
  purpose: string;
}
