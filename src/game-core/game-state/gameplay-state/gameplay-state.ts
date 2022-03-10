import {GalaxyState} from './galaxy-state/galaxy-state';
import {ResourceState} from './resource-state/resource-state';

export class GameplayState {
    public initGameSceneName: string;
    public currentTour: number;
    public galaxyState: GalaxyState = new GalaxyState();
    public resourceState: ResourceState = new ResourceState();
}