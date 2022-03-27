import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TerritoryState} from './territory.state';

interface TerritorySliceState {
    territories: TerritoryState[];
}

export const territorySlice = createSlice({
    name: 'territory',
    initialState: {
        territories: []
    } as TerritorySliceState,
    reducers: {
        addTerritory: (state: TerritorySliceState, action: PayloadAction<TerritoryState>) => {
            state.territories.push(action.payload);
        }
    }
});

export const {
    addTerritory,
} = territorySlice.actions;
