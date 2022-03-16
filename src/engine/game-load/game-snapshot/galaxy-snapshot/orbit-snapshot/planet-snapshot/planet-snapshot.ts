import {SectorSnapshot} from './sector-snapshot/sector-snapshot';

export class PlanetSnapshot {
    public name: string;
    public temperature: number;
    public belongsToPlayer: boolean;

    public size: number;
    public textureUrl: string;

    public sectors: SectorSnapshot[] = [];
}
