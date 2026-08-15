import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [PersonsModule],
  controllers: [IncidentsController],
  providers: [IncidentsService],
  exports: [IncidentsService],
})
export class IncidentsModule {}
