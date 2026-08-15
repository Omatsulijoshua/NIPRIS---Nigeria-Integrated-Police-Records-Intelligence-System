import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicCrimeTipDto {
  @ApiProperty({ example: true, description: 'Whether tip is submitted anonymously' })
  @IsBoolean()
  isAnonymous: boolean;

  @ApiProperty({ example: '10928374829', required: false, description: 'Reporter NIN (Optional if not anonymous)' })
  @IsString()
  @IsOptional()
  reporterNin?: string;

  @ApiProperty({ example: 'Chidi Okonkwo', required: false, description: 'Reporter Full Name (Optional)' })
  @IsString()
  @IsOptional()
  reporterName?: string;

  @ApiProperty({ example: '+2348012345678', required: false, description: 'Reporter Contact Phone Number (Optional)' })
  @IsString()
  @IsOptional()
  reporterPhone?: string;

  @ApiProperty({ example: 'Armed Hijacking & Highway Obstruction', description: 'Crime Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Observed two armed individuals positioning spike strips along Benin Expressway', description: 'Detailed Narrative' })
  @IsString()
  @IsNotEmpty()
  narrative: string;

  @ApiProperty({ example: 'Kilometer 42, Ore-Benin Expressway', description: 'Location Landmark' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ example: 'Edo', description: 'State Code' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 6.335, required: false, description: 'GPS Latitude' })
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 5.603, required: false, description: 'GPS Longitude' })
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: ['https://nipris.police.gov.ng/public/tips/photo1.jpg'], required: false, description: 'Media Attachment URLs' })
  @IsArray()
  @IsOptional()
  mediaAttachmentUrls?: string[];
}
