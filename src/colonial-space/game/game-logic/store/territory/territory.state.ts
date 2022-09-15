import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {TerritoryType} from './territory-type';

export interface TerritoryState<T extends {} = any> {
     id: string;
     type: TerritoryType;
     name: string;
     icon: GameIcon;
     artUrl: string;
     data: T;
}
