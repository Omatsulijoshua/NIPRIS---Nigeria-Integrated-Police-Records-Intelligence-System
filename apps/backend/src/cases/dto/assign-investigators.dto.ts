import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignInvestigatorsDto {
  @ApiProperty({ example: 'off-inv-edo', description: 'Lead Investigator Officer ID' })
  @IsString()
  @IsNotEmpty()
  leadInvestigatorId: string;

  @ApiProperty({ example: ['off-patrol-edo', 'off-forensic-01', 'off-cyber-02'], description: 'Investigative Team Officer IDs' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  teamOfficerIds: string[];
}
