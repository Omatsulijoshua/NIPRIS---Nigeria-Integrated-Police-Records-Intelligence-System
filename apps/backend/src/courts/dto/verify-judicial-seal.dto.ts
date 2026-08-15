import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyJudicialSealDto {
  @ApiProperty({ example: 'HCB/SEAL/2026/09912', description: 'Judicial Court Seal Number' })
  @IsString()
  @IsNotEmpty()
  courtSealNumber: string;

  @ApiProperty({ example: 'Hon. Justice A. B. Lawson', description: 'Issuing Judge Name' })
  @IsString()
  @IsNotEmpty()
  issuingJudgeName: string;
}
