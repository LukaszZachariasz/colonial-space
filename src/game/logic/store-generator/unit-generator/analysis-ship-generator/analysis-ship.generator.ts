import {GameIcon} from '../../../../scene/space/gui/shared/icon/game-icon';
import {UnitState} from '../../../store/unit/unit.state';
import {UnitType} from '../../../store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class AnalysisShipGenerator {
    public static generate(playerId: string): UnitState {
        return {
            id: uuid(),
            name: 'Analysis ship',
            artUrl: 'resources/unit/analysis-ship/analysis-ship-art.png',
            type: UnitType.ANALYSIS,
            icon: GameIcon.LASER_TURRET,
            health: 1,
            playerId: playerId,
            movementPoints: 1,
            movementPointsLeft: 1,
            movementPlanning: [],
            scoutRange: 1
        };
    }
}