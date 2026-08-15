import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { BiometricSearchDto } from './dto/biometric-search.dto';
import { BiometricVerifyDto } from './dto/biometric-verify.dto';
import {
  BiometricMatchResult,
  BiometricVerificationStatus,
  CrimeHeatmapPoint,
  HotspotSeverity,
  PredictiveTrendForecast,
  ExecutiveCommandAnalytics,
  NIGERIAN_STATES,
} from '@nipris/types';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);
  private readonly biometricSearchesStore = new Map<string, BiometricMatchResult>();

  constructor() {
    this.seedDevelopmentAnalytics();
  }

  private seedDevelopmentAnalytics() {
    const seedSearch: BiometricMatchResult = {
      searchId: 'bio_search_001',
      algorithmVersion: 'NIPRIS-BIOMETRICS-DEEP-V3.2',
      candidates: [
        {
          personId: 'person-chidi-001',
          personName: 'Chidi Okonkwo',
          nin: '10928374829',
          matchConfidencePercentage: 94.8,
        },
      ],
      requiresHumanVerification: true,
      humanVerificationStatus: BiometricVerificationStatus.PENDING_HUMAN_VERIFICATION,
    };

    this.biometricSearchesStore.set(seedSearch.searchId, seedSearch);
  }

  // --- BIOMETRIC SEARCH & MANDATORY HUMAN VERIFICATION ---

  async executeBiometricSearch(dto: BiometricSearchDto): Promise<BiometricMatchResult> {
    const searchId = `bio_search_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    const result: BiometricMatchResult = {
      searchId,
      algorithmVersion: 'NIPRIS-BIOMETRICS-DEEP-V3.2',
      candidates: [
        {
          personId: 'person-chidi-001',
          personName: 'Chidi Okonkwo (alias "Chidi the Cobra")',
          nin: '10928374829',
          matchConfidencePercentage: 94.8,
        },
        {
          personId: 'person-emeka-002',
          personName: 'Emeka Nwosu',
          nin: '20938475829',
          matchConfidencePercentage: 78.2,
        },
      ],
      requiresHumanVerification: true, // Mandatory Rule
      humanVerificationStatus: BiometricVerificationStatus.PENDING_HUMAN_VERIFICATION,
    };

    this.biometricSearchesStore.set(searchId, result);
    this.logger.log(`Biometric Facial Recognition Search ${searchId}: Top Candidate 94.8% match. Enforced requiresHumanVerification=true`);
    return result;
  }

  async verifyBiometricMatch(dto: BiometricVerifyDto, officerId: string): Promise<BiometricMatchResult> {
    const search = this.biometricSearchesStore.get(dto.searchId);
    if (!search) throw new NotFoundException(`Biometric Search '${dto.searchId}' not found.`);

    search.humanVerificationStatus = dto.status;
    search.humanVerifierOfficerId = officerId;
    search.verifiedAt = new Date().toISOString();
    search.verificationNotes = dto.verificationNotes;

    this.biometricSearchesStore.set(dto.searchId, search);
    this.logger.log(`Human Verifier Officer ${officerId} updated Biometric Search ${dto.searchId} status to ${dto.status}`);
    return search;
  }

  // --- NATIONAL CRIME HEATMAP & LGA DENSITY AGGREGATOR ---

  async getCrimeHeatmap(stateFilter?: string): Promise<CrimeHeatmapPoint[]> {
    const mockPoints: CrimeHeatmapPoint[] = [
      {
        lgaName: 'Oredo LGA (Benin City Central)',
        stateName: 'Edo',
        latitude: 6.335,
        longitude: 5.603,
        incidentCount: 142,
        severity: HotspotSeverity.CRITICAL,
        timeOfDayDistribution: { morning: 20, afternoon: 35, night: 62, midnight: 25 },
      },
      {
        lgaName: 'Ikeja LGA (Commercial Hub)',
        stateName: 'Lagos',
        latitude: 6.596,
        longitude: 3.343,
        incidentCount: 289,
        severity: HotspotSeverity.CRITICAL,
        timeOfDayDistribution: { morning: 45, afternoon: 80, night: 110, midnight: 54 },
      },
      {
        lgaName: 'Kano Municipal LGA',
        stateName: 'Kano',
        latitude: 12.0,
        longitude: 8.516,
        incidentCount: 88,
        severity: HotspotSeverity.MODERATE,
        timeOfDayDistribution: { morning: 15, afternoon: 25, night: 38, midnight: 10 },
      },
    ];

    if (stateFilter) {
      return mockPoints.filter((p) => p.stateName.toLowerCase() === stateFilter.toLowerCase());
    }
    return mockPoints;
  }

  // --- PREDICTIVE CRIME TREND FORECASTS & MO CLUSTERING ---

  async getPredictiveTrends(): Promise<PredictiveTrendForecast[]> {
    return [
      {
        regionName: 'Edo State - Ore Corridor Highway',
        forecastedSurgeType: 'Armed Hijacking & Transit Robbery',
        confidenceScorePercentage: 88.5,
        recommendedPatrolDensity: 'Increase Highway Patrol by +35% between 01:00 and 04:30 Hours',
        modusOperandiCluster: 'Nighttime Log-Truck Impairment & Spikestrip Obstruction',
        seasonalPattern: 'Pre-Holiday Interstate Logistics Volume Spike',
      },
      {
        regionName: 'Lagos State - Ikeja Commercial Financial Belt',
        forecastedSurgeType: 'Commercial Vault & ATM Perimeter Infiltration',
        confidenceScorePercentage: 92.1,
        recommendedPatrolDensity: 'Deploy Armored Personnel Unit to Financial District Central',
        modusOperandiCluster: 'Early Morning Heavy Machinery & Wire-Cutting Attacks',
        seasonalPattern: 'Quarter-End Commercial Liquidity Surge',
      },
    ];
  }

  // --- EXECUTIVE COMMAND DASHBOARD METRICS ---

  async getExecutiveSummary(): Promise<ExecutiveCommandAnalytics> {
    return {
      totalIncidents24h: 314,
      totalArrests30d: 1420,
      activeWarrantsCount: 89,
      capturedWantedCount: 34,
      evidenceVaultTotalBytes: 450971520000,
      caseClosurePercentage: 78.4,
      topIncidentState: 'Lagos',
      stateBreakdown: [
        { state: 'Lagos', incidents: 124, arrests: 512 },
        { state: 'Edo', incidents: 68, arrests: 290 },
        { state: 'Kano', incidents: 42, arrests: 180 },
        { state: 'Rivers', incidents: 38, arrests: 160 },
        { state: 'FCT', incidents: 42, arrests: 278 },
      ],
    };
  }
}
