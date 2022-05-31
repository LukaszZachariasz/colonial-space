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
        },
        setTerritoryDataField: (state: TerritorySliceState, action: PayloadAction<{
            territoryId: string,
            field: string,
            value: any
        }>) => {
            const territory = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
            territory.data[action.payload.field] = action.payload.value;
        }
    }
});

export const {
    addTerritory,
    setTerritoryDataField
} = territorySlice.actions;
