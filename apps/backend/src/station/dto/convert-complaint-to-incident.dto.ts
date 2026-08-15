import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertComplaintToIncidentDto {
  @ApiProperty({ example: 'cmp_001', description: 'Complaint ID to convert' })
  @IsString()
  @IsNotEmpty()
  complaintId: string;

  @ApiProperty({ example: 'CRITICAL', description: 'Incident Priority (LOW, MEDIUM, HIGH, CRITICAL)' })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ example: 'Armed Robbery at Ring Road premises', description: 'Incident Title' })
  @IsString()
  @IsNotEmpty()
  incidentTitle: string;
}
