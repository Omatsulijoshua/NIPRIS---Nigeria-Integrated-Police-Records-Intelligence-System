import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDiaryEntriesDto {
  @ApiProperty({ example: 'COMPLAINT_RECEIVED', description: 'Filter by Event Type' })
  @IsString()
  @IsOptional()
  eventType?: string;

  @ApiProperty({ example: 'Ring Road', description: 'Keyword search in description or entry number' })
  @IsString()
  @IsOptional()
  searchQuery?: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Filter by Recording Officer ID' })
  @IsString()
  @IsOptional()
  officerId?: string;
}
