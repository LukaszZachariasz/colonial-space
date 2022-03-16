import {GalaxyOriginSnapshot} from './galaxy-origin-snapshot/galaxy-origin-snapshot';
import {OrbitSnapshot} from './orbit-snapshot/orbit-snapshot';

export class GalaxySnapshot {
    public name: string;
    public galaxyOrigin: GalaxyOriginSnapshot;

    public orbits: OrbitSnapshot[] = [];
}
