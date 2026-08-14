import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'NPF-1001', description: 'Officer Badge Number / Service ID' })
  @IsString()
  @IsNotEmpty()
  badgeNumber: string;

  @ApiProperty({ example: 'SecurePass123!', description: 'Officer Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'DEV-SER-8877', description: 'Terminal Device Serial Number', required: false })
  @IsString()
  deviceId?: string;
}
