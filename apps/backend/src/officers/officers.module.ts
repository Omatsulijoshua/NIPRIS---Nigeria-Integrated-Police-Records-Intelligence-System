import { Module } from '@nestjs/common';
import { OfficersController } from './officers.controller';
import { OfficersService } from './officers.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  controllers: [OfficersController],
  providers: [OfficersService],
  exports: [OfficersService],
})
export class OfficersModule {}
