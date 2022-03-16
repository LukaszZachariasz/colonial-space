import {PlanetTypeEnum} from '../../../../../../game-objects/planet/planet-type.enum';
import {SectorSnapshot} from './sector-snapshot/sector-snapshot';

export class PlanetSnapshot {
    public name: string;
    public type: PlanetTypeEnum;
    public temperature: number;
    public belongsToPlayer: boolean;
    public size: number;
    public textureUrl: string;
    public sectors: SectorSnapshot[] = [];
}
