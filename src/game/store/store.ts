import {MapState} from './map/map.state';
import {PlayerState} from './player/player.state';
import {TourState} from './tour/tour.state';
import {UnitState} from './unit/unit.state';

export class Store {
    public map: MapState;
    public player: PlayerState;
    public tour: TourState;
    public units: UnitState[] = [];
}
