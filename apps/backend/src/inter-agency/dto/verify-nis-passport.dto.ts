import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyNisPassportDto {
  @ApiProperty({ example: 'A0991827', description: 'Nigerian International Passport Number' })
  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @ApiProperty({ example: 'Border control watchlist screening and extradition verification NPF 14', description: 'Mandatory Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
