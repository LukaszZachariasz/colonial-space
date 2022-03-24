import {UnitState} from '../unit.state';
import {UnitType} from '../unit-type';
import {v4 as uuid} from 'uuid';

export class ScoutShipState extends UnitState {
    public id: string = uuid();
    public type = UnitType.SCOUT;
    public movementSpeed = 2;
    public health = 1;
}
