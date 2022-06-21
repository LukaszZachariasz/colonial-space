import {SatelliteState} from './satellite.state';
import {TerritoryState} from '../territory.state';
import {TerritoryType} from '../territory-type';

export function isSatellite(territoryState: TerritoryState): territoryState is TerritoryState<SatelliteState> {
    return territoryState.type === TerritoryType.SATELLITE_MOON;
}
