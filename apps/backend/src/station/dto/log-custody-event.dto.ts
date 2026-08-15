import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogCustodyEventDto {
  @ApiProperty({ example: 'lcd_001', description: 'Local Custody Record ID' })
  @IsString()
  @IsNotEmpty()
  custodyId: string;

  @ApiProperty({ example: 'MEAL_PROVIDED', description: 'Custody Event Type (MEAL_PROVIDED, MEDICAL_CHECK, LAWYER_VISIT, INTERROGATION, CELL_TRANSFER, COURT_TRANSPORT, BAIL_RELEASE, NCOS_TRANSFER)' })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({ example: 'off_desk_001', description: 'Recording Officer ID' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'Standard afternoon meal provided to detainee.', description: 'Event Details Narrative' })
  @IsString()
  @IsNotEmpty()
  details: string;
}
