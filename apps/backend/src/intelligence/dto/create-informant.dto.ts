import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInformantDto {
  @ApiProperty({ example: 'INFORMANT-VIPER-09', description: 'Pseudonym Code Name' })
  @IsString()
  @IsNotEmpty()
  pseudonymCodeName: string;

  @ApiProperty({ example: 'Alhaji Bashir Yusuf (NIN: 90182938192)', description: 'True Identity (Encrypted at rest with AES-256)' })
  @IsString()
  @IsNotEmpty()
  trueIdentity: string;

  @ApiProperty({ example: 'off-patrol-edo', description: 'Handling Officer ID' })
  @IsString()
  @IsNotEmpty()
  handlerOfficerId: string;

  @ApiProperty({ example: 'off-backup-01', description: 'Backup Handling Officer ID', required: false })
  @IsOptional()
  @IsString()
  backupHandlerOfficerId?: string;

  @ApiProperty({ example: 'B2', description: 'Source Reliability Rating (e.g. A1 to F6)' })
  @IsString()
  @IsNotEmpty()
  reliabilityRating: string;
}
