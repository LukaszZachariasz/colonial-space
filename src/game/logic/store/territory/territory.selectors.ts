import {PlanetState} from './planet/planet.state';
import {TerritoryState} from './territory.state';
import {isPlanet} from './planet/is-planet';
import {store} from '../store';

export const selectTerritories = (): TerritoryState[] => store.getState().territory.territories;
export const selectTerritoryById = (id: string): TerritoryState => selectTerritories().find((el: TerritoryState) => el.id === id);
export const selectTerritoryByBuildingId = (id: string): TerritoryState<PlanetState> => selectTerritories().filter((el: TerritoryState) => isPlanet(el)).find((el: TerritoryState<PlanetState>) => el.data.buildingId === id);
