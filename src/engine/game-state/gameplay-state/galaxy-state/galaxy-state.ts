import {GalaxyOriginState} from './galaxy-origin-state/galaxy-origin-state';
import {OrbitState} from './orbit-state/orbit-state';

export class GalaxyState {
    public name: string;
    public galaxyOrigin: GalaxyOriginState;
    public orbits: OrbitState[] = [];
}
