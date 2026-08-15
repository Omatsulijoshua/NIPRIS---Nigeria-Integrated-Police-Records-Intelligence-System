import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferStationCaseDto {
  @ApiProperty({ example: 'cas_edo_001', description: 'Case ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty({ example: 'org_state_cid_edo', description: 'Target Organization ID (Station, Area Command, State CID, FCID)' })
  @IsString()
  @IsNotEmpty()
  targetOrganizationId: string;

  @ApiProperty({ example: 'STATE_CID', description: 'Target Organization Level' })
  @IsString()
  @IsNotEmpty()
  targetLevel: string;

  @ApiProperty({ example: 'Case transferred to State CID due to inter-state syndicate scope.', description: 'Reason for Transfer' })
  @IsString()
  @IsNotEmpty()
  transferReason: string;

  @ApiProperty({ example: 'off_commander_edo', description: 'Approving Officer ID' })
  @IsString()
  @IsNotEmpty()
  approvingOfficerId: string;
}
