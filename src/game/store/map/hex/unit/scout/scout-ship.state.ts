import {UnitState} from '../unit.state';
import {UnitType} from '../unit-type';

export class ScoutShipState extends UnitState {
    public unitType = UnitType.SCOUT;
    public movement = 2;
    public health = 1;
}