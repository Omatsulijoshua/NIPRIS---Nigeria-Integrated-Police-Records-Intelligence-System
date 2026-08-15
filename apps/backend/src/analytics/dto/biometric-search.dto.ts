import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BiometricSearchDto {
  @ApiProperty({ example: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', description: 'Base64 Encoded Facial Image or Biometric Template Vector' })
  @IsString()
  @IsNotEmpty()
  biometricPayload: string;

  @ApiProperty({ example: 'Facial recognition search for unidentified armed robbery suspect captured on CCTV', description: 'Operational Purpose Rationale' })
  @IsString()
  @IsNotEmpty()
  justificationRationale: string;
}
