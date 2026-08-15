import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EvidenceCustodyAction } from '@nipris/types';

export class LogCustodyTransferDto {
  @ApiProperty({ enum: EvidenceCustodyAction, example: EvidenceCustodyAction.TRANSFER_TO_LAB })
  @IsEnum(EvidenceCustodyAction)
  action: EvidenceCustodyAction;

  @ApiProperty({ example: 'State Forensic Ballistics Lab, Benin City', description: 'Recipient Officer or Physical/Digital Vault Location' })
  @IsString()
  @IsNotEmpty()
  recipientOrLocation: string;

  @ApiProperty({ example: 'Transfer for firearm ballistics matching and fingerprint extraction', description: 'Custody Transfer Rationale' })
  @IsString()
  @IsNotEmpty()
  rationale: string;
}
