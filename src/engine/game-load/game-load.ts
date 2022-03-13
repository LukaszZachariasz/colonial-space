import {GameSnapshot} from './game-snapshot/game-snapshot';
import {GameSnapshotMapper} from './game-snapshot/game-snapshot-mapper';
import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {gameState} from '../../core/game-platform';

export class GameLoad {
    private gameSnapshotMapper: GameSnapshotMapper = new GameSnapshotMapper();
    
    public load(snapshot: GameSnapshot): GameplayState {
        gameState().initialize();
        return this.gameSnapshotMapper.map(snapshot);
    }
}
