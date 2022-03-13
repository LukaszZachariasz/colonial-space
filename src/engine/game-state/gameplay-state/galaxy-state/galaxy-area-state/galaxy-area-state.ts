import {PlanetState} from './planet-state/planet-state';

export class GalaxyAreaState {
    public name: string;
    public startPath: [number, number];
    public arcPathTo: [number, number, number, number][];

    public planetStates: PlanetState[] = [];
}