import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnapshotDto {
  @ApiProperty({ example: 'eu-west-1-secondary-dr', description: 'Target Offsite DR Storage Region' })
  @IsString()
  @IsNotEmpty()
  offsiteRegion: string;
}
