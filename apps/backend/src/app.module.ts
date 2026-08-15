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
import { InterStateModule } from './inter-state/inter-state.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { AuditModule } from './audit/audit.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CourtsModule } from './courts/courts.module';
import { CustodyModule } from './custody/custody.module';
import { InterAgencyModule } from './inter-agency/inter-agency.module';

@Module({
  imports: [
    AuthModule,
    OrganizationsModule,
    OfficersModule,
    PersonsModule,
    IncidentsModule,
    ArrestsModule,
    CasesModule,
    WarrantsModule,
    EvidenceModule,
    BodycamModule,
    InterStateModule,
    IntelligenceModule,
    AuditModule,
    AnalyticsModule,
    CourtsModule,
    CustodyModule,
    InterAgencyModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
