import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationVehicleDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'NPF-EDO-001', description: 'Vehicle Plate Registration Code' })
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @ApiProperty({ example: 'PATROL-ALPHA', description: 'Tactical Radio Call Sign' })
  @IsString()
  @IsNotEmpty()
  callSign: string;

  @ApiProperty({ example: 'Toyota Hilux 4x4 Patrol Van', description: 'Vehicle Make & Model' })
  @IsString()
  @IsNotEmpty()
  makeModel: string;

  @ApiProperty({ example: 14250, description: 'Odometer Mileage in km' })
  @IsNumber()
  @IsNotEmpty()
  odometerKm: number;

  @ApiProperty({ example: 'AVAILABLE', description: 'Operational Status (AVAILABLE, PATROL, MAINTENANCE, DECOMMISSIONED)' })
  @IsString()
  @IsOptional()
  status?: string;
}
