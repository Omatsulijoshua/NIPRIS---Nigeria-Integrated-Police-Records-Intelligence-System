import { IsNotEmpty, IsString, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { WarrantType } from '@nipris/types';

export class JudicialAuthorityMetadataDto {
  @ApiProperty({ example: 'Hon. Justice O. E. Nwachukwu', description: 'Issuing Judge / Magistrate Name' })
  @IsString()
  @IsNotEmpty()
  issuingJudgeName: string;

  @ApiProperty({ example: 'High Court 3, Benin Judicial Division', description: 'Court Name' })
  @IsString()
  @IsNotEmpty()
  courtName: string;

  @ApiProperty({ example: 'Edo State Judicial Division', description: 'Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  jurisdiction: string;

  @ApiProperty({ example: 'HCB/SEAL/2026/09912', description: 'Court Seal Number' })
  @IsString()
  @IsNotEmpty()
  courtSealNumber: string;
}

export class CreateWarrantDto {
  @ApiProperty({ enum: WarrantType, example: WarrantType.ARREST_WARRANT })
  @IsEnum(WarrantType)
  warrantType: WarrantType;

  @ApiProperty({ example: 'person-chidi-001', description: 'Target Person Master ID' })
  @IsString()
  @IsNotEmpty()
  targetPersonId: string;

  @ApiProperty({ example: 'cas-edo-001', description: 'Associated Case ID', required: false })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiProperty({ example: 'inc-edo-001', description: 'Associated Incident ID', required: false })
  @IsOptional()
  @IsString()
  incidentId?: string;

  @ApiProperty({ type: JudicialAuthorityMetadataDto })
  @ValidateNested()
  @Type(() => JudicialAuthorityMetadataDto)
  judicialAuthority: JudicialAuthorityMetadataDto;

  @ApiProperty({ example: 'Armed Robbery at Commercial Bank (Section 402 Criminal Code)', description: 'Offense Allegations' })
  @IsString()
  @IsNotEmpty()
  offenseAllegations: string;

  @ApiProperty({ example: '2026-08-15T00:00:00.000Z', description: 'Issue Date' })
  @IsString()
  @IsNotEmpty()
  issueDate: string;

  @ApiProperty({ example: '2026-11-15T00:00:00.000Z', description: 'Expiration Date' })
  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty({ example: 'Edo', description: 'State Command Jurisdiction' })
  @IsString()
  @IsNotEmpty()
  state: string;
}
