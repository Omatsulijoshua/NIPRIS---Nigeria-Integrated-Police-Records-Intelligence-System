import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExecuteWarrantDto {
  @ApiProperty({ example: '2026-08-15T01:30:00.000Z', description: 'Execution Timestamp' })
  @IsString()
  @IsNotEmpty()
  executedAt: string;

  @ApiProperty({ example: 'Ring Road Commercial District, Benin City', description: 'Execution Location' })
  @IsString()
  @IsNotEmpty()
  executionLocation: string;
}
