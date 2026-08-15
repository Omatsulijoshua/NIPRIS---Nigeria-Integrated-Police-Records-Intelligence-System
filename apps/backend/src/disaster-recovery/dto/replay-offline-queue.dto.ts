import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplayOfflineQueueDto {
  @ApiProperty({ example: 'Edo', description: 'State Command Edge Node Name' })
  @IsString()
  @IsNotEmpty()
  stateName: string;
}
