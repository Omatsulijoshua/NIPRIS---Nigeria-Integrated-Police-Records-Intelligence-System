import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceDto {
  @ApiProperty({ example: 'CAM-SER-99001', description: 'Device Serial Number' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ example: 'BODYCAM', description: 'Device Type (BODYCAM, MOBILE_TERMINAL)' })
  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @ApiProperty({ example: 'off-123', description: 'Assigned Officer ID', required: false })
  @IsString()
  officerId?: string;
}
