import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitTelemetryDto {
  @ApiProperty({ example: 'unit-edo-patrol-01', description: 'Patrol Unit Identifier' })
  @IsString()
  @IsNotEmpty()
  unitId: string;

  @ApiProperty({ example: 'PATROL-EDO-101', description: 'Patrol Callsign' })
  @IsString()
  @IsNotEmpty()
  unitCallsign: string;

  @ApiProperty({ example: 'off-patrol-edo', description: 'Assigned Officer ID' })
  @IsString()
  @IsNotEmpty()
  assignedOfficerId: string;

  @ApiProperty({ example: 'Insp. Emmanuel Okafor', description: 'Assigned Officer Name' })
  @IsString()
  @IsNotEmpty()
  assignedOfficerName: string;

  @ApiProperty({ example: 'Edo', description: 'State Command' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'ON_PATROL', description: 'Duty Status' })
  @IsString()
  @IsNotEmpty()
  dutyStatus: string;

  @ApiProperty({ example: 6.338, description: 'Current GPS Latitude' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 5.608, description: 'Current GPS Longitude' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 45, description: 'Speed in km/h' })
  @IsNumber()
  speedKmH: number;
}
