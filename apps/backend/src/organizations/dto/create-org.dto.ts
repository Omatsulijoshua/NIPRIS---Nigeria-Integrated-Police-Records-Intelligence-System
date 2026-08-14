import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrgLevel } from '@nipris/types';

export class CreateOrgDto {
  @ApiProperty({ example: 'EDO-STATE-CMD', description: 'Unique Organization Code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Edo State Police Command', description: 'Organization Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: OrgLevel, example: OrgLevel.STATE_COMMAND, description: 'Organization Level' })
  @IsEnum(OrgLevel)
  level: OrgLevel;

  @ApiProperty({ example: 'Edo', description: 'State Assignment', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'org-national-hq', description: 'Parent Organization ID', required: false })
  @IsOptional()
  @IsString()
  parentId?: string;
}
