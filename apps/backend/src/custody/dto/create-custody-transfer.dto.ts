import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RemandStatus } from '@nipris/types';

export class CreateCustodyTransferDto {
  @ApiProperty({ example: 'person-chidi-001', description: 'Inmate Person ID' })
  @IsString()
  @IsNotEmpty()
  inmatePersonId: string;

  @ApiProperty({ example: 'Chidi Okonkwo', description: 'Inmate Full Name' })
  @IsString()
  @IsNotEmpty()
  inmateName: string;

  @ApiProperty({ example: 'Benin Division Police Station Cell B', description: 'Originating Police Station / Cell' })
  @IsString()
  @IsNotEmpty()
  originatingStation: string;

  @ApiProperty({ example: 'Nigerian Correctional Service (NCoS) Maximum Custodial Center, Benin City', description: 'Target NCoS Custodial Facility' })
  @IsString()
  @IsNotEmpty()
  targetNcosFacility: string;

  @ApiProperty({ example: 'RMW-2026-EDO-00912', description: 'Court Remand Warrant Number' })
  @IsString()
  @IsNotEmpty()
  remandWarrantNumber: string;

  @ApiProperty({ example: 'NCOS-OFFICER-49102', description: 'Receiving NCoS Correctional Officer ID' })
  @IsString()
  @IsNotEmpty()
  receivingNcosOfficerId: string;

  @ApiProperty({ enum: RemandStatus, example: RemandStatus.REMAND_PENDING_TRIAL })
  @IsEnum(RemandStatus)
  remandStatus: RemandStatus;
}
