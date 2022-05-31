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
        }
    }
});

export const {
    addBuilding,
} = buildingSlice.actions;
