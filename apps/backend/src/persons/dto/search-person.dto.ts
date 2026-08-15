import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPersonDto {
  @ApiProperty({ example: 'Chidi Okonkwo', description: 'Name query' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '1992-05-14', description: 'Date of Birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiProperty({ example: '12345678901', description: 'National Identity Number (NIN)' })
  @IsOptional()
  @IsString()
  nin?: string;

  @ApiProperty({ example: 'Active homicide investigation #2026-EDO-0019', description: 'Mandatory Operational Purpose Justification' })
  @IsString()
  @IsNotEmpty()
  operationalPurpose: string;
}
