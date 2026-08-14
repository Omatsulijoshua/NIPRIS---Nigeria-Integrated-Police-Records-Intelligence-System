import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OfficersModule } from './officers/officers.module';

@Module({
  imports: [AuthModule, OrganizationsModule, OfficersModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
