import { IsNotEmpty, IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OfficerRank, OfficerRole } from '@nipris/types';

export class CreateOfficerDto {
  @ApiProperty({ example: 'NPF-3003', description: 'Officer Service Badge ID' })
  @IsString()
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ example: 'Babatunde', description: 'First Name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Adeyemi', description: 'Last Name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ enum: OfficerRank, example: OfficerRank.SUPERINTENDENT, description: 'Officer Rank' })
  @IsEnum(OfficerRank)
  rank: OfficerRank;

  @ApiProperty({ example: 'babatunde.adeyemi@test.local', description: 'Official Institutional Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: OfficerRole, example: OfficerRole.INVESTIGATING_OFFICER, description: 'Assigned Role Level' })
  @IsEnum(OfficerRole)
  role: OfficerRole;

  @ApiProperty({ example: 'org-edo-station-a', description: 'Assigned Organization Unit ID' })
  @IsString()
  @IsNotEmpty()
  orgId: string;

  @ApiProperty({ example: 'CID / Homicide Division', description: 'Specialized Department or Unit', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 'SecurePass123!', description: 'Initial Temporary Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
