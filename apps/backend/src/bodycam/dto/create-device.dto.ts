import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceType } from '@nipris/types';

export class CreateDeviceDto {
  @ApiProperty({ example: 'BWC-NPF-EDO-0012', description: 'Camera Serial Number' })
  @IsString()
  @IsNotEmpty()
  deviceSerial: string;

  @ApiProperty({ example: 'Axon Body 3 / Patrol Cam V2', description: 'Device Model' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ enum: DeviceType, example: DeviceType.BODY_WORN_CAMERA })
  @IsEnum(DeviceType)
  deviceType: DeviceType;

  @ApiProperty({ example: 'org-edo-station-a', description: 'Command Unit Org ID' })
  @IsString()
  @IsNotEmpty()
  orgId: string;

  @ApiProperty({ example: 'off-patrol-edo', description: 'Assigned Officer ID', required: false })
  @IsOptional()
  @IsString()
  assignedOfficerId?: string;
}
