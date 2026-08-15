import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BodycamService } from './bodycam.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRetentionDto } from './dto/update-retention.dto';
import { ApplyRedactionDto } from './dto/apply-redaction.dto';
import { RetentionPolicy } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Body-Worn Camera & Dashcam Subsystem')
@Controller('bodycam')
@UseGuards(JwtAuthGuard)
export class BodycamController {
  constructor(private readonly bodycamService: BodycamService) {}

  @Post('devices')
  @ApiOperation({ summary: 'Register New Bodycam / Dashcam Device' })
  async registerDevice(@Body() dto: CreateDeviceDto) {
    const device = await this.bodycamService.registerDevice(dto);
    return {
      success: true,
      message: `Camera Device ${device.deviceSerial} successfully registered.`,
      data: device,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('devices/:id/assign')
  @ApiOperation({ summary: 'Assign Camera Device to Patrol Officer / Command Unit' })
  async assignDevice(@Param('id') id: string, @Body('officerId') officerId: string) {
    const device = await this.bodycamService.assignDevice(id, officerId);
    return {
      success: true,
      message: `Device ${device.deviceSerial} assigned to Officer ${officerId}.`,
      data: device,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('recordings')
  @ApiOperation({ summary: 'List Bodycam & Dashcam Recordings' })
  @ApiQuery({ name: 'officerId', required: false })
  @ApiQuery({ name: 'retentionPolicy', enum: RetentionPolicy, required: false })
  async getRecordings(@Query('officerId') officerId?: string, @Query('retentionPolicy') retentionPolicy?: RetentionPolicy) {
    const recordings = await this.bodycamService.getAllRecordings(officerId, retentionPolicy);
    return {
      success: true,
      count: recordings.length,
      data: recordings,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('recordings/:id')
  @ApiOperation({ summary: 'Get Detailed Recording File (Telemetry Track, Time-Sync Markers, Retention Status)' })
  async getRecordingById(@Param('id') id: string) {
    const rec = await this.bodycamService.getRecordingById(id);
    return {
      success: true,
      data: rec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('recordings')
  @ApiOperation({ summary: 'Ingest Stream or Batch Recording Payload with GPS Telemetry & Markers' })
  async ingestRecording(@Body() dto: CreateRecordingDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const rec = await this.bodycamService.ingestRecording(dto, officerId);
    return {
      success: true,
      message: `Recording ${rec.recordingNumber} successfully ingested.`,
      data: rec,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('recordings/:id/retention')
  @ApiOperation({ summary: 'Tag Retention Policy (AUTOMATIC_PURGE_90_DAYS, INVESTIGATIVE_HOLD_1_YEAR, EVIDENTIARY_HOLD_PERMANENT)' })
  async updateRetentionPolicy(@Param('id') id: string, @Body() dto: UpdateRetentionDto) {
    const rec = await this.bodycamService.updateRetentionPolicy(id, dto);
    return {
      success: true,
      message: `Recording ${rec.recordingNumber} retention policy updated to ${rec.retentionPolicy}.`,
      data: rec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('recordings/:id/redact')
  @ApiOperation({ summary: 'Apply Face Blur / License Plate Masking Preview Filter' })
  async applyRedaction(@Param('id') id: string, @Body() dto: ApplyRedactionDto) {
    const rec = await this.bodycamService.applyRedaction(id, dto);
    return {
      success: true,
      message: `Redaction filters applied to ${rec.recordingNumber}.`,
      data: rec,
      timestamp: new Date().toISOString(),
    };
  }
}
