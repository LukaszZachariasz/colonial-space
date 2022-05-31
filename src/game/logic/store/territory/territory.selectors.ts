import {PlanetState} from './planet/planet.state';
import {TerritoryState} from './territory.state';
import {isTerritoryPlanet} from './planet/is-territory-planet';
import {store} from '../store';

export const selectTerritories = (): TerritoryState[] => store.getState().territory.territories;
export const selectTerritoryById = (id: string): TerritoryState => selectTerritories().find((el: TerritoryState) => el.id === id);
export const selectTerritoryByBuildingId = (id: string): TerritoryState<PlanetState> => selectTerritories().filter((el: TerritoryState) => isTerritoryPlanet(el)).find((el: TerritoryState<PlanetState>) => el.data.buildingId === id);
