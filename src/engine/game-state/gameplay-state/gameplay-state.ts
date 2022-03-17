import {GalaxyState} from './galaxy-state/galaxy-state';
import {TourState} from './tour-state/tour-state';

export class GameplayState {
    public route: string;
    public galaxy: GalaxyState = new GalaxyState();
    public tour: TourState = new TourState();
}
