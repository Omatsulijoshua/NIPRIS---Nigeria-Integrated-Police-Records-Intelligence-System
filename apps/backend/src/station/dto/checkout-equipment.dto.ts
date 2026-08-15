import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutEquipmentDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'eqp_001', description: 'Equipment ID' })
  @IsString()
  @IsNotEmpty()
  equipmentId: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Officer ID checking out equipment' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'off_armorer_001', description: 'Armorer / Supervisor Approving ID' })
  @IsString()
  @IsNotEmpty()
  authorizingArmorerId: string;

  @ApiProperty({ example: 30, description: 'Ammo round count if firearm' })
  @IsNumber()
  @IsOptional()
  ammoRoundsIssued?: number;
}
