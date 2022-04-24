import {UnitType} from './unit-type';

export interface UnitState {
    id: string;
    type: UnitType;
    health: number;
    playerId: string | undefined;

    movementPoints: number;
    movementPlanning: string[];
    movementPointsLeft: number;
}
