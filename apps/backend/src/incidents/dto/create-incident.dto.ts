import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentPriority, ClassificationLevel } from '@nipris/types';

export class CreateIncidentDto {
  @ApiProperty({ example: 'Armed Robbery at Commercial Bank Branch', description: 'Incident Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Four armed suspects breached the main vault area.', description: 'Detailed Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Armed Robbery', description: 'Incident Type Category' })
  @IsString()
  @IsNotEmpty()
  incidentType: string;

  @ApiProperty({ example: 'Ring Road, Benin City, Edo State', description: 'Location Name' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ example: 6.335, description: 'Latitude Coordinate', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 5.603, description: 'Longitude Coordinate', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: '2026-08-15T00:10:00.000Z', description: 'Occurred At Timestamp' })
  @IsString()
  @IsNotEmpty()
  occurredAt: string;

  @ApiProperty({ enum: IncidentPriority, example: IncidentPriority.CRITICAL })
  @IsEnum(IncidentPriority)
  priority: IncidentPriority;

  @ApiProperty({ enum: ClassificationLevel, example: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED })
  @IsOptional()
  @IsEnum(ClassificationLevel)
  classification?: ClassificationLevel;
}
