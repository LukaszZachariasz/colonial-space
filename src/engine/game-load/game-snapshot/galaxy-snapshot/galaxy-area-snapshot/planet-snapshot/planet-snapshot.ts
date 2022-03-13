import {SectorSnapshot} from './sector-snapshot/sector-snapshot';

export class PlanetSnapshot {
    public name: string;
    public temperature: number;

    public size: number;
    public textureUrl: string;
    public position: {
        x: number,
        y: number,
        z: number
    };

    public sectors: SectorSnapshot[] = [];
}
