import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutEvidenceDto {
  @ApiProperty({ example: 'sevd_001', description: 'Station Evidence ID' })
  @IsString()
  @IsNotEmpty()
  evidenceId: string;

  @ApiProperty({ example: 'COURT_PRESENTATION', description: 'Checkout Purpose (COURT_PRESENTATION, FORENSIC_LAB_ANALYSIS, INTER_STATION_TRANSFER)' })
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @ApiProperty({ example: 'off_cid_001', description: 'Releasing Officer ID' })
  @IsString()
  @IsNotEmpty()
  releasingOfficerId: string;

  @ApiProperty({ example: 'Magistrate Court 1 Benin City', description: 'Destination Location / Recipient' })
  @IsString()
  @IsNotEmpty()
  destination: string;
}
