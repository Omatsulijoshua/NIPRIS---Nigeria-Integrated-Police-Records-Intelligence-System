import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentPriority, ClassificationLevel } from '@nipris/types';

export class CreateCaseDto {
  @ApiProperty({ example: 'Operation Commercial Shield - Benin Vault Heist Investigation', description: 'Case Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Comprehensive armed robbery investigation involving multi-state syndicate.', description: 'Case Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: IncidentPriority, example: IncidentPriority.CRITICAL })
  @IsEnum(IncidentPriority)
  priority: IncidentPriority;

  @ApiProperty({ example: 'off-inv-edo', description: 'Lead Investigator Officer ID' })
  @IsString()
  @IsNotEmpty()
  leadInvestigatorId: string;

  @ApiProperty({ example: ['off-patrol-edo', 'off-forensic-01'], description: 'Investigative Team Officer IDs', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teamOfficerIds?: string[];

  @ApiProperty({ example: 'Edo', description: 'State Command Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED })
  @IsOptional()
  @IsEnum(ClassificationLevel)
  classification?: ClassificationLevel;
}
