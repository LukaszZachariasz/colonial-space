import {PlanetState} from './planet.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isTerritoryPlanet(territoryState: TerritoryState): territoryState is TerritoryState<PlanetState> {
    return territoryState.type === TerritoryType.PLANET;
}
