import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateStationReportDto {
  @ApiProperty({ example: 'stn_edo_001', description: 'Station Organization ID' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'MONTHLY', description: 'Report Period (DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUAL)' })
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty({ example: 'CSV', description: 'Export Format (CSV, PDF, JSON)' })
  @IsString()
  @IsOptional()
  format?: string;

  @ApiProperty({ example: '2026-08-01', description: 'Start Date YYYY-MM-DD' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ example: '2026-08-31', description: 'End Date YYYY-MM-DD' })
  @IsString()
  @IsOptional()
  endDate?: string;
}
