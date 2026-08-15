import { Module } from '@nestjs/common';
import { ArrestsController } from './arrests.controller';
import { ArrestsService } from './arrests.service';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [PersonsModule],
  controllers: [ArrestsController],
  providers: [ArrestsService],
  exports: [ArrestsService],
})
export class ArrestsModule {}
