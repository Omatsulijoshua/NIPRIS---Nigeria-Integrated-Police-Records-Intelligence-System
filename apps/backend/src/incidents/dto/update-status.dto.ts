import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentStatus } from '@nipris/types';

export class UpdateIncidentStatusDto {
  @ApiProperty({ enum: IncidentStatus, example: IncidentStatus.UNDER_INVESTIGATION })
  @IsEnum(IncidentStatus)
  status: IncidentStatus;

  @ApiProperty({ example: 'CID Detectives dispatched to scene. Forensic evidence secured.', description: 'Audit Justification' })
  @IsString()
  @IsNotEmpty()
  statusReason: string;
}
