import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationUnitDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'Criminal Investigation Department (CID)', description: 'Station Unit Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'UNT-CID-01', description: 'Unit Code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Specialized unit responsible for felony investigations and intelligence', description: 'Unit Description' })
  @IsString()
  @IsOptional()
  description?: string;
}
