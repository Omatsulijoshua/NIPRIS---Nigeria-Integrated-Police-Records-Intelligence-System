import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkCaseEvidenceDto {
  @ApiProperty({ example: 'BODYCAM', description: 'Asset Type (EVIDENCE, BODYCAM, DASHCAM, PHOTO, DOCUMENT)' })
  @IsString()
  @IsNotEmpty()
  assetType: 'EVIDENCE' | 'BODYCAM' | 'DASHCAM' | 'PHOTO' | 'DOCUMENT';

  @ApiProperty({ example: 'cam-rec-edo-9912', description: 'Digital Asset ID or S3 URL' })
  @IsString()
  @IsNotEmpty()
  assetId: string;

  @ApiProperty({ example: 'Patrol Body-Camera Recording during Vault Breach', description: 'Asset Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://s3.nipris.gov.ng/evidence/cam-9912.mp4', description: 'Asset URL', required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ example: 'Shows suspect matching Chidi Okonkwo entering rear exit at 00:18 AM', description: 'Investigative Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
