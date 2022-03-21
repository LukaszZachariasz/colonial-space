import {UnitType} from './unit-type';
import {v4 as uuid} from 'uuid';

export abstract class UnitState {
    public id: string = uuid();
    public abstract unitType: UnitType;
    public abstract health: number;
    public abstract movement: number;
    public playerId: string;
}
