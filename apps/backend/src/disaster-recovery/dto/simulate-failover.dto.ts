import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SimulateFailoverDto {
  @ApiProperty({ example: 'PRIMARY_DB_AZ1', description: 'Primary Database Node to Simulate Failure' })
  @IsString()
  @IsNotEmpty()
  simulatedFailureNode: string;
}
