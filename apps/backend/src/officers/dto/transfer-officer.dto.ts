import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferOfficerDto {
  @ApiProperty({ example: 'org-state-lagos', description: 'New Destination Organization Unit ID' })
  @IsString()
  @IsNotEmpty()
  newOrgId: string;

  @ApiProperty({ example: 'Inter-state command transfer order #NPF/HQ/2026/881', description: 'Transfer Reason / Order Reference' })
  @IsString()
  @IsNotEmpty()
  transferReason: string;

  @ApiProperty({ example: 'State CID Operations', description: 'New Assigned Department', required: false })
  @IsOptional()
  @IsString()
  newDepartment?: string;
}
