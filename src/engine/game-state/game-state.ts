import {GameplayState} from './gameplay-state/gameplay-state';
import {TourManager} from '../../game-core/tour/tour-manager';

export class GameState {
    public tourManager: TourManager;
    public gameplayState: GameplayState;

    public initialize(): void {
        this.tourManager = new TourManager();
        this.gameplayState = new GameplayState();
    }
}

