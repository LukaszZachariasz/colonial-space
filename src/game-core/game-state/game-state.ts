import {GameScene} from '../../game-scenes/game-scene';
import {GameplayState} from './gameplay-state/gameplay-state';
import {ThreatManager} from '../threat/threat-manager';
import {TourManager} from '../tour/tour-manager';

export class GameState {
    public tourManager: TourManager = new TourManager();
    public threatManager: ThreatManager = new ThreatManager();
    public gameScenes: GameScene[] = [];

    public gameplayState: GameplayState = new GameplayState();
}

const gameState = new GameState();
export default gameState;
