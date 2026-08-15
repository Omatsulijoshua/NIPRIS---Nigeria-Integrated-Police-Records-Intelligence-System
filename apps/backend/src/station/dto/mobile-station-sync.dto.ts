import { IsNotEmpty, IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MobileDiaryDraftDto {
  @ApiProperty({ example: 'sde_draft_001' })
  @IsString()
  @IsNotEmpty()
  draftId: string;

  @ApiProperty({ example: 'ARREST_BOOKING' })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({ example: 'Drafted entry from mobile tablet during field patrol' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2026-08-15T11:00:00Z' })
  @IsString()
  @IsNotEmpty()
  recordedAt: string;
}

export class MobileAttendanceLogDto {
  @ApiProperty({ example: 'off_patrol_001' })
  @IsString()
  @IsNotEmpty()
  officerId: string;

  @ApiProperty({ example: 'CLOCK_IN' })
  @IsString()
  @IsNotEmpty()
  actionType: string;

  @ApiProperty({ example: 6.335 })
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 5.603 })
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: '2026-08-15T11:00:00Z' })
  @IsString()
  @IsNotEmpty()
  timestamp: string;
}

export class MobileVisitorScanDto {
  @ApiProperty({ example: 'VST-2026-STN001-00912' })
  @IsString()
  @IsNotEmpty()
  visitorNumber: string;

  @ApiProperty({ example: 'BC-VST-991201' })
  @IsString()
  @IsNotEmpty()
  scannedBarcode: string;

  @ApiProperty({ example: '2026-08-15T11:00:00Z' })
  @IsString()
  @IsNotEmpty()
  scannedAt: string;
}

export class MobileStationSyncDto {
  @ApiProperty({ example: 'stn_edo_001' })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({ example: 'off_patrol_001' })
  @IsString()
  @IsNotEmpty()
  deviceOfficerId: string;

  @ApiProperty({ example: 'MOB-TAB-EDO-001' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ type: [MobileDiaryDraftDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MobileDiaryDraftDto)
  diaryDrafts?: MobileDiaryDraftDto[];

  @ApiProperty({ type: [MobileAttendanceLogDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MobileAttendanceLogDto)
  attendanceLogs?: MobileAttendanceLogDto[];

  @ApiProperty({ type: [MobileVisitorScanDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MobileVisitorScanDto)
  visitorScans?: MobileVisitorScanDto[];
}
