import {GameIcon} from '../../../../scene/space/gui/shared/icon/game-icon';
import {UnitState} from '../../../store/unit/unit.state';
import {UnitType} from '../../../store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class ColonialShipGenerator {
    public static generate(playerId: string): UnitState {
        return {
            id: uuid(),
            name: 'Colonial ship',
            artUrl: 'resources/unit/colonial-ship/colonial-ship-art.png',
            type: UnitType.COLONIAL,
            icon: GameIcon.BASE_DOME,
            health: 1,
            playerId: playerId,
            movementPoints: 1,
            movementPointsLeft: 1,
            movementPlanning: [],
            scoutRange: 1
        };
    }
}