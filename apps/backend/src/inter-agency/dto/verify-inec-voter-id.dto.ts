import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyInecVoterIdDto {
  @ApiProperty({ example: 'INEC-VIN-90012837', description: 'INEC Voter Identification Number (VIN)' })
  @IsString()
  @IsNotEmpty()
  voterVin: string;

  @ApiProperty({ example: 'Electoral fraud investigation cross-reference NPF 14', description: 'Mandatory Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
