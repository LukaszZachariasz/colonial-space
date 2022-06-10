import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PlanetState} from './planet/planet.state';
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
        completeAnalysis: (state: TerritorySliceState, action: PayloadAction<{
            territoryId: string
        }>) => {
            const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
            territory.data.analysisTourLeft = 0;
            territory.data.isAnalysed = true;
        },
        completeColonization: (state: TerritorySliceState, action: PayloadAction<{
            territoryId: string
        }>) => {
            const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
            territory.data.isColonized = true;
        },
        setTerritoryDataField: (state: TerritorySliceState, action: PayloadAction<{ // TODO: convert to different actions
            territoryId: string,
            field: string,
            value: any
        }>) => {
            const territory = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
            territory.data[action.payload.field] = action.payload.value;
        },
        analysePlanet: (state: TerritorySliceState, action: PayloadAction<{territoryId: string, power: number}>) => {
            const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
            territory.data.analysisTourLeft -= action.payload.power;
            territory.data.analysisTourLeft = Math.max(territory.data.analysisTourLeft, 0);
            if (territory.data.analysisTourLeft === 0) {
                territory.data.isAnalysed = true;
            }
        }
    }
});

export const {
    addTerritory,
    completeAnalysis,
    completeColonization,
    setTerritoryDataField,
    analysePlanet
} = territorySlice.actions;
