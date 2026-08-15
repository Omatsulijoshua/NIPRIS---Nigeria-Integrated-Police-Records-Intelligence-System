import { Module } from '@nestjs/common';
import { PublicServicesController } from './public-services.controller';
import { PublicServicesService } from './public-services.service';

@Module({
  controllers: [PublicServicesController],
  providers: [PublicServicesService],
  exports: [PublicServicesService],
})
export class PublicServicesModule {}
