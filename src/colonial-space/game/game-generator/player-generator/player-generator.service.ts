import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlayerState} from '../../game-logic/store/player/player.state';
import {v4 as uuid} from 'uuid';

@Injectable()
export class PlayerGeneratorService {
    public generate(): PlayerState {
        return {
            id: uuid(),
            name: 'Player 1',
            color: '#ff0000'
        };
    }
}
