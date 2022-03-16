import {SectorState} from './sector-state/sector-state';

export class PlanetState {
    public name: string;
    public belongsToPlayer: boolean;
    public temperature: number;
    public size: number;
    public textureUrl: string;
    public sectors: SectorState[] = [];
}
