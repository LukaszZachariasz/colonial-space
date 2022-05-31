import {BuildingState} from './building.state';
import {store} from '../store';

export const selectBuildings = (): BuildingState[] => store.getState().building.buildings;
export const selectBuildingById = (id: string): BuildingState => selectBuildings().find((el: BuildingState) => el.id === id);
