import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignOfficersDto {
  @ApiProperty({ example: ['off-patrol-edo', 'off-inv-edo'], description: 'List of Officer IDs assigned to incident' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  officerIds: string[];
}
