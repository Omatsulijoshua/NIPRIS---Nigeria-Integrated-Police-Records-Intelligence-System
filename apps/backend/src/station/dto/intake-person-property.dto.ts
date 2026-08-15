import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PropertyItemDto {
  @ApiProperty({ example: 'iPhone 14 Pro Max Black', description: 'Item Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'ELECTRONICS', description: 'Property Category (ELECTRONICS, CASH, JEWELRY, CLOTHING, DOCUMENTS)' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'GOOD', description: 'Item Condition' })
  @IsString()
  @IsNotEmpty()
  condition: string;

  @ApiProperty({ example: 'BIN-14-A', description: 'Storage Locker Bin Location' })
  @IsString()
  @IsNotEmpty()
  storageBin: string;
}

export class IntakePersonPropertyDto {
  @ApiProperty({ example: 'lcd_001', description: 'Local Custody Record ID' })
  @IsString()
  @IsNotEmpty()
  custodyId: string;

  @ApiProperty({ example: 'per_edo_suspect_01', description: 'Detainee Person ID' })
  @IsString()
  @IsNotEmpty()
  personId: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Intake Officer ID' })
  @IsString()
  @IsNotEmpty()
  intakeOfficerId: string;

  @ApiProperty({ type: [PropertyItemDto], description: 'Items array' })
  @IsArray()
  @IsNotEmpty()
  items: PropertyItemDto[];
}
