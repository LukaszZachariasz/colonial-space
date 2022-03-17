import {GalaxySnapshot} from './galaxy-snapshot/galaxy-snapshot';
import {TourSnapshot} from './tour-snapshot/tour-snapshot';

export class GameSnapshot {
    public route: string;
    public galaxy: GalaxySnapshot = new GalaxySnapshot();
    public tour: TourSnapshot = new TourSnapshot();
}
