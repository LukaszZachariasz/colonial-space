import {StarState} from './star.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isStar(territoryState: TerritoryState): territoryState is TerritoryState<StarState> {
    return territoryState.type === TerritoryType.STAR_SOLAR;
}
