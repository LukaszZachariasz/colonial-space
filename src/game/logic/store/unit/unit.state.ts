import {UnitType} from './unit-type';

export interface UnitState {
    id: string;
    name: string;
    type: UnitType;
    health: number;
    playerId: string | undefined;

    movementPoints: number;
    movementPlanning: string[];
    movementPointsLeft: number;

    scoutRange: number;
}
