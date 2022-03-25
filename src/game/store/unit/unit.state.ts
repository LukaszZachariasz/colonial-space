import {UnitType} from './unit-type';

export abstract class UnitState {
    public abstract type: UnitType;
    public abstract health: number;
    public abstract movementSpeed: number;
    public plannedMovement: string[] = [];
    public playerId: string | undefined;
    public squareId: string;
}
