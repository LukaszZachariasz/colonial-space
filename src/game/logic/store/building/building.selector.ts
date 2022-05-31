import {BuildingObjectState} from './building-scope/building-object/building-object.state';
import {BuildingScopeState} from './building-scope/building-scope.state';
import {BuildingState} from './building.state';
import {store} from '../store';

export const selectBuildings = (): BuildingState[] => store.getState().building.buildings;
export const selectBuildingById = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.id === id);
export const selectBuildingByBuildingObjectId = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.scopes.map((el: BuildingScopeState) => el.objects).flat().some((el: BuildingObjectState) => el.id === id));
export const selectIsCurrentBuildingByBuildingObjectId = (id: string): boolean => selectBuildingByBuildingObjectId(id).currentBuildingObjectId === id;