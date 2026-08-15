import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageLocationDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'STN001-EVDRM-A-RACK02-BIN05', description: 'Storage Location Code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Evidence Room A - Firearms & Narcotics Safe', description: 'Storage Location Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'SAFE', description: 'Location Type (ROOM, RACK, SHELF, LOCKER, SAFE, COLD_STORAGE)' })
  @IsString()
  @IsNotEmpty()
  locationType: string;

  @ApiProperty({ example: true, description: 'Requires High Security Level Access' })
  @IsBoolean()
  @IsOptional()
  isHighSecurity?: boolean;
}
