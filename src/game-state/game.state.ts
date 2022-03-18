import {MapState} from './map/map.state';
import {PlayerState} from './player/player.state';
import {TourState} from './tour/tour.state';

export class GameState {
    public player: PlayerState;
    public map: MapState;
    public tour: TourState;
}
