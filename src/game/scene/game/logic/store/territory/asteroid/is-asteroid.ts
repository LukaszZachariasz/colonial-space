import {AsteroidState} from './asteroid.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isAsteroid(territoryState: TerritoryState): territoryState is TerritoryState<AsteroidState> {
    return territoryState.type === TerritoryType.ASTEROID_VOLCANIC;
}
