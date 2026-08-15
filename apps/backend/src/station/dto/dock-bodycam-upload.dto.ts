import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DockBodycamUploadDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'DOCK-STN001-01', description: 'Station Dock ID' })
  @IsString()
  @IsNotEmpty()
  dockId: string;

  @ApiProperty({ example: 'BWC-NPF-EDO-001', description: 'Bodycam Device Code' })
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @ApiProperty({ example: 45, description: 'Footage duration in minutes' })
  @IsNumber()
  @IsNotEmpty()
  durationMinutes: number;

  @ApiProperty({ example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', description: 'SHA-256 Verification Hash' })
  @IsString()
  @IsNotEmpty()
  sha256Hash: string;

  @ApiProperty({ example: 'off_patrol_001', description: 'Assigned Officer ID if known' })
  @IsString()
  @IsOptional()
  officerId?: string;
}
