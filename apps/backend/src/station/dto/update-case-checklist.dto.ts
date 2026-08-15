import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCaseChecklistDto {
  @ApiProperty({ example: 'cas_edo_001', description: 'Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: 'CRIME_SCENE_VISITED', description: 'Checklist Item Key (CRIME_SCENE_VISITED, WITNESSES_INTERVIEWED, SUSPECT_INTERVIEWED, EVIDENCE_COLLECTED, FORENSICS_REQUESTED, LEGAL_REVIEW_DONE, PROSECUTION_FILE_COMPILED, COURT_DATE_SET)' })
  @IsString()
  @IsNotEmpty()
  itemKey: string;

  @ApiProperty({ example: true, description: 'Completion status' })
  @IsBoolean()
  isCompleted: boolean;
}
