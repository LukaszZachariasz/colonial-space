import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TerritoryState} from './territory.state';
import {planetReducer} from './planet/planet.reducer';

export interface TerritorySliceState {
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
        },
        ...planetReducer
    }
});

export const {
    addTerritory,
    completeAnalysis,
    completeColonization,
    analysePlanet,
    setWaterPercentage,
    setSunlightPercentage
} = territorySlice.actions;
