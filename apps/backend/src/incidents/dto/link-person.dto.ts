import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentPersonRole } from '@nipris/types';

export class LinkIncidentPersonDto {
  @ApiProperty({ example: 'person-chidi-001', description: 'Person Master ID' })
  @IsString()
  @IsNotEmpty()
  personId: string;

  @ApiProperty({ enum: IncidentPersonRole, example: IncidentPersonRole.SUSPECT, description: 'Role in Incident' })
  @IsEnum(IncidentPersonRole)
  roleInIncident: IncidentPersonRole;

  @ApiProperty({ example: 'Identified via eyewitness bank CCTV footage', description: 'Linking Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
