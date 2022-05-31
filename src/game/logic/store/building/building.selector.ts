import {BuildingScopeState} from './building-scope/building-scope.state';
import {BuildingState} from './building.state';
import {store} from '../store';

export const selectBuildings = (): BuildingState[] => store.getState().building.buildings;
export const selectBuildingById = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.id === id);
export const selectBuildingScopeById = (id: string): BuildingScopeState => selectBuildings().map((el: BuildingState) => el.scopes).flat().find((el: BuildingScopeState) => el.id === id);