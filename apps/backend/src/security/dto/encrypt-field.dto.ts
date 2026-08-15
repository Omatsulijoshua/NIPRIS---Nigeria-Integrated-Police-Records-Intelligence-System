import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptFieldDto {
  @ApiProperty({ example: '10928374829', description: 'Plaintext Field Value (e.g. NIN, Biometric Ref, Identity Data)' })
  @IsString()
  @IsNotEmpty()
  plaintextValue: string;
}
