import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { SearchPersonDto } from './dto/search-person.dto';
import { ResolveIdentityDto } from './dto/resolve-identity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Person Identity & Resolution Subsystem')
@Controller('persons')
@UseGuards(JwtAuthGuard)
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiOperation({ summary: 'Register New Person Master Record' })
  async createPerson(@Body() dto: CreatePersonDto) {
    const record = await this.personsService.createPerson(dto);
    return {
      success: true,
      message: `Person Master Record ${record.id} successfully registered.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('search')
  @ApiOperation({ summary: 'Search Person Master Index (Requires Mandatory Operational Purpose Justification)' })
  async searchPersons(@Body() dto: SearchPersonDto) {
    const records = await this.personsService.searchPersons(dto);
    return {
      success: true,
      count: records.length,
      data: records,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('resolve')
  @ApiOperation({ summary: 'Multi-Criteria Identity Resolution Matching (Returns MATCH, POSSIBLE_MATCH, or NO_MATCH)' })
  async resolveIdentity(@Body() dto: ResolveIdentityDto) {
    const result = await this.personsService.resolveIdentity(dto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve Master Person Record Profile' })
  async getPersonById(@Param('id') id: string) {
    const record = await this.personsService.getPersonById(id);
    return {
      success: true,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }
}
