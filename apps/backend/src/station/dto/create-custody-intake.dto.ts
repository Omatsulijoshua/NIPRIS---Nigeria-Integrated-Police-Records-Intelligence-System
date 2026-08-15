import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustodyIntakeDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'per_edo_suspect_01', description: 'Detainee Person ID' })
  @IsString()
  @IsNotEmpty()
  personId: string;

  @ApiProperty({ example: 'Osagie Efe', description: 'Detainee Full Name' })
  @IsString()
  @IsNotEmpty()
  personName: string;

  @ApiProperty({ example: 'arr_edo_001', description: 'Arrest Record ID' })
  @IsString()
  @IsNotEmpty()
  arrestId: string;

  @ApiProperty({ example: 'CELL-02', description: 'Assigned Holding Cell ID' })
  @IsString()
  @IsNotEmpty()
  cellId: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Intake Officer ID' })
  @IsString()
  @IsNotEmpty()
  intakeOfficerId: string;

  @ApiProperty({ example: 'Suspected armed robbery suspect booked under section 312 PC.', description: 'Detention Reason Narrative' })
  @IsString()
  @IsNotEmpty()
  reasonForDetention: string;

  @ApiProperty({ example: 'No visible injuries, asthmatic condition reported.', description: 'Medical & Health Assessment Note' })
  @IsString()
  @IsOptional()
  medicalNote?: string;

  @ApiProperty({ example: 'HIGH', description: 'Risk Rating (LOW, MEDIUM, HIGH)' })
  @IsString()
  @IsOptional()
  riskRating?: string;

  @ApiProperty({ example: 24, description: 'Constitutional detention clock hours (24 or 48)' })
  @IsNumber()
  @IsOptional()
  detentionLimitHours?: number;
}
