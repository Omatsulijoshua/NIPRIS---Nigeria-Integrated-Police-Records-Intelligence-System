import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DispatchVehicleLogDto {
  @ApiProperty({ example: 'veh_001', description: 'Vehicle ID' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Driver / Patrol Officer ID' })
  @IsString()
  @IsNotEmpty()
  driverOfficerId: string;

  @ApiProperty({ example: 'Evening Patrol Sector B (Ring Road - GRA)', description: 'Patrol Sector / Mission Description' })
  @IsString()
  @IsNotEmpty()
  missionDescription: string;

  @ApiProperty({ example: 14250, description: 'Departure Odometer Reading in km' })
  @IsNumber()
  @IsNotEmpty()
  departureKm: number;

  @ApiProperty({ example: 14310, description: 'Arrival Odometer Reading in km if returning' })
  @IsNumber()
  @IsOptional()
  arrivalKm?: number;

  @ApiProperty({ example: 15, description: 'Liters of fuel consumed' })
  @IsNumber()
  @IsOptional()
  fuelLiters?: number;
}
