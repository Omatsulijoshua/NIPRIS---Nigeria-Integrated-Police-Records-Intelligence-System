import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyFrscLicenseDto {
  @ApiProperty({ example: 'ED88912/FRSC', description: "Driver's License Number or Vehicle VIN" })
  @IsString()
  @IsNotEmpty()
  licenseOrVinNumber: string;

  @ApiProperty({ example: 'On-scene traffic stop and stolen vehicle verification NPF 14', description: 'Mandatory Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
