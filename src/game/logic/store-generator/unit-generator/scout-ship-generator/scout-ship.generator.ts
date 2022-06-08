import {GameIcon} from '../../../../scene/space/gui/shared/icon/game-icon';
import {UnitState} from '../../../store/unit/unit.state';
import {UnitType} from '../../../store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class ScoutShipGenerator {
    public static generate(playerId: string): UnitState {
        return {
            id: uuid(),
            name: 'Scout ship',
            artUrl: 'resources/unit/scout-ship/scout-ship-art.png',
            type: UnitType.SCOUT,
            icon: GameIcon.SPYGLASS,
            health: 1,
            playerId: playerId,
            movementPoints: 2,
            movementPointsLeft: 2,
            movementPlanning: [],
            scoutRange: 1
        };
    }
}