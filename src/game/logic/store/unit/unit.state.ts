import {UnitType} from './unit-type';

export interface UnitState {
    id: string;
    type: UnitType;
    health: number;
    movementSpeed: number;
    plannedMovement: string[];
    playerId: string | undefined;
}
