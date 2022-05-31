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
        }
    }
});

export const {
    addBuilding,
    selectBuilding
} = buildingSlice.actions;
