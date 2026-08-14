import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { CreateOrgDto } from './dto/create-org.dto';
import { OrgLevel, NIGERIAN_STATES, OrganizationNode } from '@nipris/types';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);
  private readonly orgTree = new Map<string, OrganizationNode>();

  constructor() {
    this.seedInitialNigerianHierarchy();
  }

  private seedInitialNigerianHierarchy() {
    // 1. National HQ
    const nationalHq: OrganizationNode = {
      id: 'org-national-hq',
      code: 'NG-NAT-HQ',
      name: 'Nigeria Police National Headquarters (Louis Edet House)',
      level: OrgLevel.NATIONAL_HQ,
      createdAt: new Date().toISOString(),
    };
    this.orgTree.set(nationalHq.id, nationalHq);

    // 2. 36 State Commands + FCT
    NIGERIAN_STATES.forEach((stateName) => {
      const code = `NG-STATE-${stateName.toUpperCase().replace(/\s+/g, '_')}`;
      const id = `org-state-${stateName.toLowerCase().replace(/\s+/g, '-')}`;
      const stateNode: OrganizationNode = {
        id,
        code,
        name: `${stateName} State Police Command`,
        level: OrgLevel.STATE_COMMAND,
        parentId: nationalHq.id,
        state: stateName,
        createdAt: new Date().toISOString(),
      };
      this.orgTree.set(id, stateNode);
    });

    // 3. Edo State Sample Area Command & Station A
    const edoState = this.orgTree.get('org-state-edo');
    if (edoState) {
      const edoCentralArea: OrganizationNode = {
        id: 'org-edo-central-area',
        code: 'EDO-AREA-CENTRAL',
        name: 'Benin Central Area Command',
        level: OrgLevel.AREA_COMMAND,
        parentId: edoState.id,
        state: 'Edo',
        createdAt: new Date().toISOString(),
      };
      this.orgTree.set(edoCentralArea.id, edoCentralArea);

      const beninDiv: OrganizationNode = {
        id: 'org-benin-div-a',
        code: 'EDO-DIV-BENIN-1',
        name: 'Benin Central Division',
        level: OrgLevel.DIVISION,
        parentId: edoCentralArea.id,
        state: 'Edo',
        createdAt: new Date().toISOString(),
      };
      this.orgTree.set(beninDiv.id, beninDiv);

      const stationA: OrganizationNode = {
        id: 'org-edo-station-a',
        code: 'EDO-STATION-A',
        name: 'Benin Central Police Station A',
        level: OrgLevel.POLICE_STATION,
        parentId: beninDiv.id,
        state: 'Edo',
        createdAt: new Date().toISOString(),
      };
      this.orgTree.set(stationA.id, stationA);
    }
  }

  async getAllOrganizations(state?: string, level?: OrgLevel): Promise<OrganizationNode[]> {
    let nodes = Array.from(this.orgTree.values());
    if (state) {
      nodes = nodes.filter((n) => n.state?.toLowerCase() === state.toLowerCase());
    }
    if (level) {
      nodes = nodes.filter((n) => n.level === level);
    }
    return nodes;
  }

  async getOrganizationById(id: string): Promise<OrganizationNode> {
    const node = this.orgTree.get(id);
    if (!node) throw new NotFoundException(`Organization node with ID '${id}' not found.`);
    return node;
  }

  async createOrganization(dto: CreateOrgDto): Promise<OrganizationNode> {
    const existing = Array.from(this.orgTree.values()).find((n) => n.code === dto.code);
    if (existing) {
      throw new ConflictException(`Organization code '${dto.code}' already exists.`);
    }

    if (dto.parentId && !this.orgTree.has(dto.parentId)) {
      throw new NotFoundException(`Parent Organization ID '${dto.parentId}' does not exist.`);
    }

    const newNode: OrganizationNode = {
      id: `org_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      code: dto.code,
      name: dto.name,
      level: dto.level,
      state: dto.state,
      parentId: dto.parentId,
      createdAt: new Date().toISOString(),
    };

    this.orgTree.set(newNode.id, newNode);
    this.logger.log(`Created organization node: ${newNode.name} (${newNode.code})`);
    return newNode;
  }

  async getHierarchyPath(id: string): Promise<OrganizationNode[]> {
    const path: OrganizationNode[] = [];
    let current = this.orgTree.get(id);

    while (current) {
      path.unshift(current);
      if (current.parentId) {
        current = this.orgTree.get(current.parentId);
      } else {
        break;
      }
    }
    return path;
  }
}
