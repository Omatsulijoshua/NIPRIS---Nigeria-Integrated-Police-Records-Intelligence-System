import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DisposeEvidenceDto {
  @ApiProperty({ example: 'sevd_001', description: 'Station Evidence ID' })
  @IsString()
  @IsNotEmpty()
  evidenceId: string;

  @ApiProperty({ example: 'COURT_RELEASE_ORDER', description: 'Disposal Type (COURT_RELEASE_ORDER, DESTRUCTION_ORDER, STATE_FORFEITURE, AUCTION_RELEASE)' })
  @IsString()
  @IsNotEmpty()
  disposalType: string;

  @ApiProperty({ example: 'CRT-ORD-2026-EDO-001', description: 'Court Order / Authority Reference' })
  @IsString()
  @IsNotEmpty()
  authorityReference: string;

  @ApiProperty({ example: 'off_commander_edo', description: 'Authorizing Officer ID' })
  @IsString()
  @IsNotEmpty()
  authorizingOfficerId: string;
}
