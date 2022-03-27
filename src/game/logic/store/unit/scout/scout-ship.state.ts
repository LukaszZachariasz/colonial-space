import {UnitState} from '../unit.state';
import {UnitType} from '../unit-type';
import {v4 as uuid} from 'uuid';

/**
 * @deprecated
 */
export class ScoutShipState implements UnitState {
    public id: string = uuid();
    public type = UnitType.SCOUT;
    public health = 1;
    public movementSpeed = 2;
    public plannedMovement: string[] = [];
    public playerId: string | undefined;
    public squareId: string;
}
