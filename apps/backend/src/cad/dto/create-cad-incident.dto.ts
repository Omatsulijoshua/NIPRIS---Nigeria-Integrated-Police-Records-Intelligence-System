import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentPriority } from '@nipris/types';

export class CreateCadIncidentDto {
  @ApiProperty({ example: 'Armed Hijacking & Vehicle Theft', description: 'CAD Callout Incident Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'ARMED_ROBBERY', description: 'Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ enum: IncidentPriority, example: IncidentPriority.CRITICAL, description: 'Incident Priority' })
  @IsEnum(IncidentPriority)
  priority: IncidentPriority;

  @ApiProperty({ example: 'Kilometer 42, Ore-Benin Expressway', description: 'Location Landmark' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ example: 'Edo', description: 'State Code' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 6.335, description: 'GPS Latitude' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 5.603, description: 'GPS Longitude' })
  @IsNumber()
  longitude: number;
}
