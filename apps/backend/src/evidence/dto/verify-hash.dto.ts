import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyHashDto {
  @ApiProperty({ example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', description: 'Calculated SHA-256 Checksum Hash to compare against evidence record' })
  @IsString()
  @IsNotEmpty()
  calculatedHash: string;
}
