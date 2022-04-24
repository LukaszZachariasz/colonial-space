import {UnitState} from '../unit.state';
import {UnitType} from '../unit-type';
import {v4 as uuid} from 'uuid';

export class ScoutShipState implements UnitState {
    public id: string = uuid();
    public type = UnitType.SCOUT;
    public health = 1;
    public movementPoints = 2;
    public movementPlanning: string[] = [];
    public squareId: string;
    public movementPointsLeft = 2;

    constructor(public playerId: string | undefined) {
    }
}
