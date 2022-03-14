import {GalaxySnapshot} from './galaxy-snapshot/galaxy-snapshot';
import {ResourceSnapshot} from './resource-snapshot/resource-snapshot';
import {TourSnapshot} from './tour-snapshot/tour-snapshot';

export class GameSnapshot {
    public route: string;
    public galaxy: GalaxySnapshot = new GalaxySnapshot();
    public tour: TourSnapshot = new TourSnapshot();
    public resource: ResourceSnapshot = new ResourceSnapshot();
}
