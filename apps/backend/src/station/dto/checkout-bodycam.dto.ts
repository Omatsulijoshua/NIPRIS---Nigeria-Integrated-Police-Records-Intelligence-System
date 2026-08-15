import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutBodycamDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'BWC-NPF-EDO-001', description: 'Bodycam Device Code' })
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Officer ID checking out device' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'sft_eve_01', description: 'Assigned Shift ID' })
  @IsString()
  @IsNotEmpty()
  shiftId: string;
}
