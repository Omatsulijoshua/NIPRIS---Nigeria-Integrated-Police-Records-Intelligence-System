import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompileProsecutionSheetDto {
  @ApiProperty({ example: 'cas_edo_001', description: 'Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: ['Section 312 Criminal Code Act (Armed Robbery)', 'Section 402 Penal Code'], description: 'Statutory Charges' })
  @IsArray()
  @IsNotEmpty()
  offenceCharges: string[];

  @ApiProperty({ example: 'Suspect Osagie Efe was apprehended with stolen firearm at Ring Road.', description: 'Summary of Evidence' })
  @IsString()
  @IsNotEmpty()
  summaryOfEvidence: string;

  @ApiProperty({ example: ['Chief Emeka Nnamdi', 'Sgt Monday Usifo'], description: 'Witness List' })
  @IsArray()
  @IsNotEmpty()
  witnesses: string[];

  @ApiProperty({ example: 'Recommend immediate arraignment before Magistrate Court 1 Benin City.', description: 'Investigating Officer Recommendation' })
  @IsString()
  @IsNotEmpty()
  ioRecommendation: string;
}
