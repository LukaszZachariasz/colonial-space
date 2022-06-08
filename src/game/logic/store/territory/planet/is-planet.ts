import {PlanetState} from './planet.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isPlanet(territoryState: TerritoryState): territoryState is TerritoryState<PlanetState> {
    return territoryState.type === TerritoryType.PLANET_GREEN ||
        territoryState.type === TerritoryType.PLANET_SAND ||
        territoryState.type === TerritoryType.PLANET_RINGED ||
        territoryState.type === TerritoryType.PLANET_METAL;
}
