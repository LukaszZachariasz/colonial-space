import {MapState} from './map/map.state';
import {PlayerState} from './player/player.state';

export class GameState {
    public player: PlayerState;
    public map: MapState;
}