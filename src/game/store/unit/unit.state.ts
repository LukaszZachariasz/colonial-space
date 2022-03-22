import {UnitType} from './unit-type';

export abstract class UnitState {
    public abstract type: UnitType;
    public abstract health: number;
    public abstract movement: number;
    public playerId: string | undefined;
    public hexId: string;
}
