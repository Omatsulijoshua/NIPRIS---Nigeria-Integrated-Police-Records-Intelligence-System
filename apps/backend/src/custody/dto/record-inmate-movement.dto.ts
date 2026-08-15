import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InmateMovementType } from '@nipris/types';

export class RecordInmateMovementDto {
  @ApiProperty({ example: 'person-chidi-001', description: 'Inmate Person ID' })
  @IsString()
  @IsNotEmpty()
  inmatePersonId: string;

  @ApiProperty({ example: 'Chidi Okonkwo', description: 'Inmate Full Name' })
  @IsString()
  @IsNotEmpty()
  inmateName: string;

  @ApiProperty({ enum: InmateMovementType, example: InmateMovementType.COURT_APPEARANCE })
  @IsEnum(InmateMovementType)
  movementType: InmateMovementType;

  @ApiProperty({ example: 'NCoS Benin Maximum Facility', description: 'Departure Location' })
  @IsString()
  @IsNotEmpty()
  fromLocation: string;

  @ApiProperty({ example: 'Edo State High Court 1', description: 'Destination Location' })
  @IsString()
  @IsNotEmpty()
  toLocation: string;

  @ApiProperty({ example: 'NPF-2002', description: 'Escorting Officer Badge Number' })
  @IsString()
  @IsNotEmpty()
  escortOfficerId: string;

  @ApiProperty({ example: 'POL-VAN-EDO-091', description: 'Transport Vehicle Serial / Plate Number' })
  @IsString()
  @IsNotEmpty()
  transportVehicleSerial: string;
}
