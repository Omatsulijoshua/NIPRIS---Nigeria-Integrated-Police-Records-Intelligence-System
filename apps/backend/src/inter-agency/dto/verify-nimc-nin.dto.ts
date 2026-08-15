import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyNimcNinDto {
  @ApiProperty({ example: '10928374829', description: '11-Digit National Identification Number (NIN)' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  nin: string;

  @ApiProperty({ example: 'Verification of NIN for suspect identity booking NPF 14', description: 'Mandatory Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
