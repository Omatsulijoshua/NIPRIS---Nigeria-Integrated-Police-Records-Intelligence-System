import { IsNotEmpty, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveRequestDto {
  @ApiProperty({ example: true, description: 'Grant or Deny Access' })
  @IsBoolean()
  approved: boolean;

  @ApiProperty({ example: 'Cross-state intelligence sharing cleared by Lagos State CP', description: 'Approval or Rejection Reason', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
