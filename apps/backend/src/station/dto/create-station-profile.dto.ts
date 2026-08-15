import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationProfileDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Organization UUID with level POLICE_STATION' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: 'STN-EDO-BENIN-CENTRAL', description: 'Unique Station Code' })
  @IsString()
  @IsNotEmpty()
  stationCode: string;

  @ApiProperty({ example: 'Oredo LGA', description: 'Local Government Area' })
  @IsString()
  @IsNotEmpty()
  lga: string;

  @ApiProperty({ example: '1 Sapele Road, Benin City, Edo State', description: 'Physical Station Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+234-803-000-1122', description: 'Station Direct Phone Number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'benin.central@police.gov.ng', description: 'Station Official Email' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'off_commander_edo', description: 'Station Commander Officer ID' })
  @IsString()
  @IsOptional()
  commanderOfficerId?: string;

  @ApiProperty({ example: 15, description: 'Holding Cell Capacity' })
  @IsNumber()
  @IsOptional()
  holdingCellCapacity?: number;

  @ApiProperty({ example: 6.335, description: 'GPS Latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 5.603, description: 'GPS Longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}
