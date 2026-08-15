import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OfficersModule } from './officers/officers.module';
import { PersonsModule } from './persons/persons.module';
import { IncidentsModule } from './incidents/incidents.module';
import { ArrestsModule } from './arrests/arrests.module';
import { CasesModule } from './cases/cases.module';
import { WarrantsModule } from './warrants/warrants.module';
import { EvidenceModule } from './evidence/evidence.module';
import { BodycamModule } from './bodycam/bodycam.module';

@Module({
  imports: [AuthModule, OrganizationsModule, OfficersModule, PersonsModule, IncidentsModule, ArrestsModule, CasesModule, WarrantsModule, EvidenceModule, BodycamModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
