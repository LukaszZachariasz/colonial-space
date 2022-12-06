import {BlackHoleState} from './black-hole.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isBlackHole(territoryState: TerritoryState): territoryState is TerritoryState<BlackHoleState> {
    return territoryState.type === TerritoryType.BLACK_HOLE;
}
