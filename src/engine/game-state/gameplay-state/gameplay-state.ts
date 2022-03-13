import {GalaxyState} from './galaxy-state/galaxy-state';
import {ResourceState} from './resource-state/resource-state';
import {TourState} from './tour-state/tour-state';

export class GameplayState {
    public initGameSceneName: string;
    public tourState: TourState = new TourState();
    public galaxyState: GalaxyState = new GalaxyState();
    public resourceState: ResourceState = new ResourceState();
}
