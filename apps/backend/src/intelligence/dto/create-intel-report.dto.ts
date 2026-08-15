import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SourceReliabilityRating, InformationValidityRating, ClassificationLevel } from '@nipris/types';

export class CreateIntelReportDto {
  @ApiProperty({ example: 'Cross-Border Firearm Smuggling Syndicate Operations in Ore Corridor', description: 'Report Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Raw intelligence indicating shipment of AK-47 rifles hidden inside timber trucks leaving Benin City at 02:00 hours.', description: 'Raw Intelligence Text' })
  @IsString()
  @IsNotEmpty()
  rawSummary: string;

  @ApiProperty({ enum: SourceReliabilityRating, example: SourceReliabilityRating.B_USUALLY_RELIABLE })
  @IsEnum(SourceReliabilityRating)
  sourceReliability: SourceReliabilityRating;

  @ApiProperty({ enum: InformationValidityRating, example: InformationValidityRating.V2_PROBABLY_TRUE })
  @IsEnum(InformationValidityRating)
  informationValidity: InformationValidityRating;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.TOP_SECRET_LAW_ENFORCEMENT })
  @IsEnum(ClassificationLevel)
  classification: ClassificationLevel;

  @ApiProperty({ example: 'inf-viper-09', description: 'Informant Pseudonym ID', required: false })
  @IsOptional()
  @IsString()
  informantPseudonymId?: string;

  @ApiProperty({ example: 'cas-edo-001', description: 'Linked Target Case ID', required: false })
  @IsOptional()
  @IsString()
  targetCaseId?: string;

  @ApiProperty({ example: 'inc-edo-001', description: 'Linked Target Incident ID', required: false })
  @IsOptional()
  @IsString()
  targetIncidentId?: string;

  @ApiProperty({ example: 'RESTRICTED_TO_STATE_COMMAND_SPECIAL_ANTI_ROBBERY', description: 'Dissemination Clearance Level' })
  @IsString()
  @IsNotEmpty()
  disseminationClearance: string;
}
