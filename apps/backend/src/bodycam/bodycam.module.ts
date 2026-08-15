import { Module } from '@nestjs/common';
import { BodycamController } from './bodycam.controller';
import { BodycamService } from './bodycam.service';

@Module({
  controllers: [BodycamController],
  providers: [BodycamService],
  exports: [BodycamService],
})
export class BodycamModule {}
