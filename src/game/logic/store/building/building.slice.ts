import {BuildingObjectState} from './building-scope/building-object/building-object.state';
import {BuildingScopeState} from './building-scope/building-scope.state';
import {BuildingState} from './building.state';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface BuildingSliceState {
    buildings: BuildingState[];
}

export const buildingSlice = createSlice({
    name: 'building',
    initialState: {
        buildings: []
    } as BuildingSliceState,
    reducers: {
        addBuilding: (state: BuildingSliceState, action: PayloadAction<BuildingState>) => {
            state.buildings.push(action.payload);
        },
        selectBuilding: (state: BuildingSliceState, action: PayloadAction<{
            buildingId: string,
            objectId: string
        }>) => {
            const building = state.buildings.find((el: BuildingState) => el.id === action.payload.buildingId);
            building.currentBuildingObjectId = action.payload.objectId;
        },
        build: (state: BuildingSliceState, action: PayloadAction<{
            buildingId: string,
            production: number
        }>) => {
            const building = state.buildings.find((el: BuildingState) => el.id === action.payload.buildingId);
            if (building.currentBuildingObjectId) {
                const currentBuildingObject: BuildingObjectState = building.scopes.map((el: BuildingScopeState) => el.objects).flat().find((el: BuildingObjectState) => el.id === building.currentBuildingObjectId);
                currentBuildingObject.production -= action.payload.production;
                if (currentBuildingObject.production < 0) {
                    building.currentBuildingObjectId = null;
                    currentBuildingObject.production = 0;
                }
            }
        },
        setIsBuiltTrue: (state: BuildingSliceState, action: PayloadAction<{
            buildingObjectId: string
        }>) => {
            const buildingObject = state.buildings.map((el: BuildingState) => el.scopes).flat().map((el: BuildingScopeState) => el.objects).flat().find((el: BuildingObjectState) => el.id === action.payload.buildingObjectId);
            buildingObject.isBuilt = true;
        }
    }
});

export const {
    addBuilding,
    selectBuilding,
    build,
    setIsBuiltTrue
} = buildingSlice.actions;
