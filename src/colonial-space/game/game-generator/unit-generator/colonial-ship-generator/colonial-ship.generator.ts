import {ColonialShipState} from '../../../game-logic/store/unit/colonial-ship/colonial-ship.state';
import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../game-logic/store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class ColonialShipGenerator {
    public static generate(playerId: string): UnitState<ColonialShipState> {
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
            isWorking: false,
            scoutRange: 1,
            data: {}
        };
    }
}