import {GalaxyAreaSnapshot} from './galaxy-area-snapshot/galaxy-area-snapshot';
import {GalaxyOriginSnapshot} from './galaxy-origin-snapshot/galaxy-origin-snapshot';

export class GalaxySnapshot {
    public name: string;
    public galaxyOrigin: GalaxyOriginSnapshot;

    public galaxyAreas: GalaxyAreaSnapshot[] = [];
}
