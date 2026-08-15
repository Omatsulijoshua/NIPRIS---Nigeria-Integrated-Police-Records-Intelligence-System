import { Module } from '@nestjs/common';
import { WarrantsController } from './warrants.controller';
import { WarrantsService } from './warrants.service';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [PersonsModule],
  controllers: [WarrantsController],
  providers: [WarrantsService],
  exports: [WarrantsService],
})
export class WarrantsModule {}
