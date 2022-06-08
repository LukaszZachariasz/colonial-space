import {PlayerState} from '../../store/player/player.state';
import {v4 as uuid} from 'uuid';

export class PlayerGenerator {
    public static generate(): PlayerState {
        return {
            id: uuid(),
            name: 'Player 1',
            color: '#ff0000'
        };
    }
}
