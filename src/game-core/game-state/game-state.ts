import {GameplayState} from './gameplay-state/gameplay-state';
import {TourManager} from '../tour/tour-manager';

export class GameState {
    public tourManager: TourManager = new TourManager();

    public gameplayState: GameplayState = new GameplayState();
}

const gameState = new GameState();
export default gameState;
