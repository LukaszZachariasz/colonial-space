import {UnitState} from '../../../store/unit/unit.state';
import {UnitType} from '../../../store/unit/unit-type';
import {v4 as uuid} from 'uuid';

export class UnitGenerator {
    public generate(playerId: string): UnitState {
        return {
            id: uuid(),
            type: UnitType.SCOUT,
            health: 1,
            movementSpeed: 2,
            plannedMovement: [],
            playerId: playerId
        };
    }
}
