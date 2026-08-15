import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { SearchPersonDto } from './dto/search-person.dto';
import { ResolveIdentityDto } from './dto/resolve-identity.dto';
import {
  PersonMasterRecord,
  ClassificationLevel,
  IdentityMatchStatus,
  IdentityResolutionResult,
} from '@nipris/types';

@Injectable()
export class PersonsService {
  private readonly logger = new Logger(PersonsService.name);
  private readonly personsStore = new Map<string, PersonMasterRecord>();

  constructor() {
    this.seedDevelopmentPersons();
  }

  private seedDevelopmentPersons() {
    const seedPerson: PersonMasterRecord = {
      id: 'person-chidi-001',
      nin: '12345678901',
      firstName: 'Chidi',
      lastName: 'Okonkwo',
      middleName: 'Emeka',
      aliases: ['"Chidi the Cobra"', '"Emeso"'],
      dateOfBirth: '1992-05-14',
      sex: 'Male',
      nationality: 'Nigerian',
      photoUrl: 'https://s3.nipris.gov.ng/photos/person-chidi.jpg',
      biometricRef: 'bio_ref_sha256_99887766554433221100',
      classification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      identifiers: [
        { type: 'NIN', value: '12345678901' },
        { type: 'DRIVERS_LICENSE', value: 'EDO-99182-DL' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.personsStore.set(seedPerson.id, seedPerson);
  }

  async createPerson(dto: CreatePersonDto): Promise<PersonMasterRecord> {
    // Check Duplicate NIN
    if (dto.nin) {
      const duplicateNin = Array.from(this.personsStore.values()).find((p) => p.nin === dto.nin);
      if (duplicateNin) {
        throw new ConflictException(`Person Master Record with NIN '${dto.nin}' already exists (Person ID: ${duplicateNin.id}).`);
      }
    }

    const newPerson: PersonMasterRecord = {
      id: `person_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      nin: dto.nin,
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      aliases: dto.aliases || [],
      dateOfBirth: dto.dateOfBirth,
      sex: dto.sex,
      nationality: dto.nationality,
      photoUrl: dto.photoUrl,
      biometricRef: dto.biometricRef,
      classification: dto.classification || ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      identifiers: dto.nin ? [{ type: 'NIN', value: dto.nin }] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.personsStore.set(newPerson.id, newPerson);
    this.logger.log(`Created Person Master Record: ${newPerson.firstName} ${newPerson.lastName} (ID: ${newPerson.id})`);
    return newPerson;
  }

  async searchPersons(dto: SearchPersonDto): Promise<PersonMasterRecord[]> {
    let records = Array.from(this.personsStore.values());

    if (dto.nin) {
      records = records.filter((p) => p.nin === dto.nin);
    }
    if (dto.dateOfBirth) {
      records = records.filter((p) => p.dateOfBirth === dto.dateOfBirth);
    }
    if (dto.name) {
      const queryStr = dto.name.toLowerCase();
      records = records.filter(
        (p) =>
          p.firstName.toLowerCase().includes(queryStr) ||
          p.lastName.toLowerCase().includes(queryStr) ||
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(queryStr) ||
          p.aliases.some((a) => a.toLowerCase().includes(queryStr))
      );
    }

    this.logger.log(`Searched Person Master Index. Purpose: "${dto.operationalPurpose}". Returned ${records.length} result(s).`);
    return records;
  }

  async resolveIdentity(dto: ResolveIdentityDto): Promise<IdentityResolutionResult> {
    const records = Array.from(this.personsStore.values());
    let bestMatch: PersonMasterRecord | undefined;
    let confidenceScore = 0;
    const candidates: PersonMasterRecord[] = [];

    for (const person of records) {
      let currentScore = 0;

      // Exact Biometric Ref Match (Highest Weight: +60 points)
      if (dto.biometricRef && person.biometricRef === dto.biometricRef) {
        currentScore += 60;
      }

      // Exact NIN Match (Weight: +40 points)
      if (dto.nin && person.nin === dto.nin) {
        currentScore += 40;
      }

      // Exact DOB Match (Weight: +20 points)
      if (dto.dateOfBirth && person.dateOfBirth === dto.dateOfBirth) {
        currentScore += 20;
      }

      // Name Match (Weight: +20 points)
      if (
        (dto.firstName && person.firstName.toLowerCase() === dto.firstName.toLowerCase()) ||
        (dto.lastName && person.lastName.toLowerCase() === dto.lastName.toLowerCase())
      ) {
        currentScore += 20;
      }

      if (currentScore > 0) {
        candidates.push(person);
        if (currentScore > confidenceScore) {
          confidenceScore = currentScore;
          bestMatch = person;
        }
      }
    }

    let status = IdentityMatchStatus.NO_MATCH;
    if (confidenceScore >= 80) {
      status = IdentityMatchStatus.MATCH;
    } else if (confidenceScore >= 30) {
      status = IdentityMatchStatus.POSSIBLE_MATCH;
    }

    this.logger.log(`Identity resolution evaluated. Status: ${status} (Score: ${confidenceScore}%).`);

    return {
      status,
      confidenceScore: Math.min(confidenceScore, 100),
      matchedPerson: status === IdentityMatchStatus.MATCH ? bestMatch : undefined,
      possibleCandidates: candidates,
      requiresHumanVerification: true, // Master Rule: Automated match MUST undergo human forensic verification before enforcement action!
      notes:
        status === IdentityMatchStatus.MATCH
          ? 'Match candidate identified. Authorized human forensic verification required prior to enforcement action.'
          : status === IdentityMatchStatus.POSSIBLE_MATCH
          ? 'Possible matches detected. Review candidate records.'
          : 'No matching person record found in Master Index.',
    };
  }

  async getPersonById(id: string): Promise<PersonMasterRecord> {
    const person = this.personsStore.get(id);
    if (!person) throw new NotFoundException(`Person Master Record with ID '${id}' not found.`);
    return person;
  }
}
