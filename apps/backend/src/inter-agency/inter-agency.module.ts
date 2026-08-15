import { Module } from '@nestjs/common';
import { InterAgencyController } from './inter-agency.controller';
import { InterAgencyService } from './inter-agency.service';

@Module({
  controllers: [InterAgencyController],
  providers: [InterAgencyService],
  exports: [InterAgencyService],
})
export class InterAgencyModule {}
