import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {ScoutShipState} from '../../../game-logic/store/unit/scout-ship/scout-ship.state';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../game-logic/store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class ScoutShipGenerator {
    public static generate(playerId: string): UnitState<ScoutShipState> {
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
            isWorking: false,
            scoutRange: 1,
            data: {}
        };
    }
}
