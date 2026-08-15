import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WantedRiskLevel } from '@nipris/types';

export class CreateWantedDto {
  @ApiProperty({ example: 'person-chidi-001', description: 'Target Person Master ID' })
  @IsString()
  @IsNotEmpty()
  personId: string;

  @ApiProperty({ example: 'cas-edo-001', description: 'Associated Case ID', required: false })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiProperty({ example: ['war-edo-001'], description: 'Active Warrant IDs' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  warrantIds: string[];

  @ApiProperty({ enum: WantedRiskLevel, example: WantedRiskLevel.ARMED_AND_DANGEROUS })
  @IsEnum(WantedRiskLevel)
  riskLevel: WantedRiskLevel;

  @ApiProperty({ example: 5000000, description: 'Bounty Reward Amount (NGN)', required: false })
  @IsOptional()
  @IsNumber()
  bountyAmount?: number;

  @ApiProperty({ example: false, description: 'Public Circular Flag (False by default for internal law enforcement)' })
  @IsBoolean()
  publicCircular: boolean;

  @ApiProperty({ example: 'Suspect believed to be armed with automatic rifles. Approach with extreme caution.', description: 'Investigative Remarks' })
  @IsString()
  @IsNotEmpty()
  remarks: string;
}
