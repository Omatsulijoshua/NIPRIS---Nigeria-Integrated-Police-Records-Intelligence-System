import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyRedactionDto {
  @ApiProperty({ example: ['FACE_BLUR', 'LICENSE_PLATE_MASK', 'MINOR_IDENTITY_PIXELATE'], description: 'Applied Redaction Filters' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  redactionFilters: string[];

  @ApiProperty({ example: 'Bystander face blur applied for public FOI disclosure release', description: 'Redaction Justification Rationale' })
  @IsString()
  @IsNotEmpty()
  justification: string;
}
