import {PlanetState} from './planet/planet.state';
import {TerritoryState} from './territory.state';
import {TerritoryType} from './territory-type';
import {isPlanet} from './planet/is-planet';
import {selectSquareByUnitId} from '../map/square/square.selectors';
import {store} from '../store';

export const selectTerritories = (): TerritoryState[] => store.getState().territory.territories;
export const selectTerritoryById = (id: string): TerritoryState => selectTerritories().find((el: TerritoryState) => el.id === id);
export const selectTerritoryByTerritoryType = (territoryType: TerritoryType): TerritoryState[] => selectTerritories().filter((el: TerritoryState) => el.type === territoryType);
export const selectTerritoryByBuildingId = (id: string): TerritoryState<PlanetState> => selectTerritories().filter((el: TerritoryState) => isPlanet(el)).find((el: TerritoryState<PlanetState>) => el.data.buildingId === id);
export const selectTerritoryByUnitId = (unitId: string): TerritoryState => selectTerritoryById(selectSquareByUnitId(unitId).territoryId);