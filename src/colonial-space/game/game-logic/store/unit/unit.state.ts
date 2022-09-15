import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {UnitType} from './unit-type';

export interface UnitState<T extends {} = any> {
    id: string;
    name: string;
    artUrl: string;
    icon: GameIcon;
    type: UnitType;
    health: number;
    playerId: string | undefined;

    movementPoints: number;
    movementPlanning: string[];
    movementPointsLeft: number;
    isWorking: boolean;

    scoutRange: number;

    data: T;
}
