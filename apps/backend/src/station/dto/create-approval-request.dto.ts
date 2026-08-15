import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApprovalRequestDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'FIREARM_RELEASE', description: 'Approval Category (FIREARM_RELEASE, CUSTODY_BAIL_RELEASE, OVERTIME_PAY, INTER_STATION_TRANSFER)' })
  @IsString()
  @IsNotEmpty()
  requestCategory: string;

  @ApiProperty({ example: 'Request release of AK-47 for VIP escort mission to Asaba.', description: 'Approval Justification Narrative' })
  @IsString()
  @IsNotEmpty()
  justification: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Requesting Officer ID' })
  @IsString()
  @IsNotEmpty()
  requestingOfficerId: string;
}
