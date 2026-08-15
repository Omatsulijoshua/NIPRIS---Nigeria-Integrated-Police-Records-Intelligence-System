import { Module } from '@nestjs/common';
import { InterStateController } from './inter-state.controller';
import { InterStateService } from './inter-state.service';

@Module({
  controllers: [InterStateController],
  providers: [InterStateService],
  exports: [InterStateService],
})
export class InterStateModule {}
