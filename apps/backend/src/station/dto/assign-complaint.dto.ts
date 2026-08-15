import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignComplaintDto {
  @ApiProperty({ example: 'cmp_001', description: 'Complaint ID to assign' })
  @IsString()
  @IsNotEmpty()
  complaintId: string;

  @ApiProperty({ example: 'off_cid_001', description: 'Assigned Investigating Officer ID' })
  @IsString()
  @IsNotEmpty()
  assignedOfficerId: string;
}
