import {BuildingObjectState} from './building-scope/building-object/building-object.state';
import {BuildingObjectType} from './building-scope/building-object/building-object-type';
import {BuildingScopeState} from './building-scope/building-scope.state';
import {BuildingState} from './building.state';
import {store} from '../store';

export const selectBuildings = (): BuildingState[] => store.getState().building.buildings;
export const selectBuildingById = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.id === id);
export const selectBuildingByBuildingObjectId = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.scopes.map((el: BuildingScopeState) => el.objects).flat().some((el: BuildingObjectState) => el.id === id));
export const selectIsCurrentBuildingByBuildingObjectId = (id: string): boolean => selectBuildingByBuildingObjectId(id).currentBuildingObjectId === id;
export const selectBuildingObjectById = (id: string): BuildingObjectState => selectBuildings().map((el: BuildingState) => el.scopes).flat().map((el: BuildingScopeState) => el.objects).flat().find((el: BuildingObjectState) => el.id === id);
export const selectBuildingObjectsByProduction0AndNotBuilt = (): BuildingObjectState[] => selectBuildings().map((el: BuildingState) => el.scopes).flat().map((el: BuildingScopeState) => el.objects).flat().filter((el: BuildingObjectState) => el.production === 0 && el.isBuilt === false);
export const selectBuildingObjectsByProduction0AndNotBuiltAndType = (type: BuildingObjectType): BuildingObjectState[] => selectBuildingObjectsByProduction0AndNotBuilt().filter((el: BuildingObjectState) => el.type === type);
