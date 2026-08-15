import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JudicialOrderType } from '@nipris/types';

export class IngestJudicialOrderDto {
  @ApiProperty({ enum: JudicialOrderType, example: JudicialOrderType.STAY_OF_PROCEEDINGS })
  @IsEnum(JudicialOrderType)
  orderType: JudicialOrderType;

  @ApiProperty({ example: 'Hon. Justice A. B. Lawson', description: 'Issuing Judge Name' })
  @IsString()
  @IsNotEmpty()
  issuingJudgeName: string;

  @ApiProperty({ example: 'High Court of Edo State, Benin Division', description: 'Court Name' })
  @IsString()
  @IsNotEmpty()
  courtName: string;

  @ApiProperty({ example: 'HCB/SEAL/2026/09912', description: 'Court Seal Number' })
  @IsString()
  @IsNotEmpty()
  courtSealNumber: string;

  @ApiProperty({ example: 'case-edo-2026-001', description: 'Target Case ID' })
  @IsString()
  @IsNotEmpty()
  targetCaseId: string;

  @ApiProperty({ example: 'Judicial stay of proceedings ordered pending interlocutory appeal on jurisdiction', description: 'Order Summary Text' })
  @IsString()
  @IsNotEmpty()
  summaryText: string;
}
