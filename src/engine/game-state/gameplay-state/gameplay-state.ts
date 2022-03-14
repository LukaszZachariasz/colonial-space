import {GalaxyState} from './galaxy-state/galaxy-state';
import {ResourceState} from './resource-state/resource-state';
import {TourState} from './tour-state/tour-state';

export class GameplayState {
    public route: string;
    public galaxy: GalaxyState = new GalaxyState();
    public tour: TourState = new TourState();
    public resource: ResourceState = new ResourceState();
}
