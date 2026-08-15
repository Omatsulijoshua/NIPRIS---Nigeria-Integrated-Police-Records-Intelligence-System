import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StatutoryCountDto {
  @ApiProperty({ example: 1, description: 'Count Number' })
  countNumber: number;

  @ApiProperty({ example: 'Section 412 Penal Code Cap 30 Laws of Edo State 2006', description: 'Penal Code Section' })
  @IsString()
  @IsNotEmpty()
  penalCodeSection: string;

  @ApiProperty({ example: 'Armed Robbery & Unlawful Possession of Prohibited Firearms', description: 'Offense Title' })
  @IsString()
  @IsNotEmpty()
  offenseTitle: string;

  @ApiProperty({ example: 'That you Chidi Okonkwo on or about the 14th day of August 2026 at Benin City did commit armed robbery...', description: 'Particulars of Offense' })
  @IsString()
  @IsNotEmpty()
  particularsOfOffense: string;
}

export class CreateChargeSheetDto {
  @ApiProperty({ example: 'case-edo-2026-001', description: 'Associated Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: 'arr-edo-2026-001', description: 'Associated Arrest ID' })
  @IsString()
  @IsNotEmpty()
  arrestId: string;

  @ApiProperty({ example: 'person-chidi-001', description: 'Suspect Person ID' })
  @IsString()
  @IsNotEmpty()
  suspectPersonId: string;

  @ApiProperty({ example: 'Chidi Okonkwo', description: 'Suspect Full Name' })
  @IsString()
  @IsNotEmpty()
  suspectName: string;

  @ApiProperty({ example: 'High Court of Edo State, Benin Division', description: 'Target Court Name' })
  @IsString()
  @IsNotEmpty()
  courtName: string;

  @ApiProperty({ example: 'Edo', description: 'Jurisdiction State Code' })
  @IsString()
  @IsNotEmpty()
  jurisdictionState: string;

  @ApiProperty({ type: [StatutoryCountDto], description: 'Statutory Criminal Counts List' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatutoryCountDto)
  statutoryCounts: StatutoryCountDto[];

  @ApiProperty({ example: 'HCB/SEAL/2026/09912', description: 'Judicial Court Seal Number' })
  @IsString()
  @IsNotEmpty()
  courtSealNumber: string;
}
