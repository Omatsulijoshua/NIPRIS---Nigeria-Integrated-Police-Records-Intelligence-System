import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LookupStolenVehicleDto {
  @ApiProperty({ example: 'EDO-291-BEN', description: 'License Plate Number or Vehicle VIN' })
  @IsString()
  @IsNotEmpty()
  queryIdentifier: string;
}
