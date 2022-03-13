import {PlanetSnapshot} from './planet-snapshot/planet-snapshot';

export class GalaxyAreaSnapshot {
    public name: string;
    public startPath: [number, number];
    public arcPathTo: [number, number, number, number][];

    public planets: PlanetSnapshot[] = [];
}
