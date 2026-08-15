import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StationEvidenceIntakeDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'cas_edo_001', description: 'Linked Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: 'FIREARM', description: 'Evidence Category (FIREARM, NARCOTICS, CURRENCY, ELECTRONICS, BIOLOGICAL, WEAPON_BLADE, DOCUMENTS)' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Beretta 9mm Pistol with 5 live rounds', description: 'Evidence Item Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'STN001-EVDRM-A-RACK02-BIN05', description: 'Storage Location Code' })
  @IsString()
  @IsNotEmpty()
  storageLocationCode: string;

  @ApiProperty({ example: 'off_cid_001', description: 'Intake Officer ID' })
  @IsString()
  @IsNotEmpty()
  intakeOfficerId: string;

  @ApiProperty({ example: 0.85, description: 'Weight in kg if applicable' })
  @IsNumber()
  @IsOptional()
  weightKg?: number;
}
