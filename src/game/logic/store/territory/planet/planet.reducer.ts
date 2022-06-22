import {PayloadAction} from '@reduxjs/toolkit';
import {PlanetState} from './planet.state';
import {TerritorySliceState} from '../territory.slice';
import {TerritoryState} from '../territory.state';

export const planetReducer = {
    completeAnalysis: (state: TerritorySliceState, action: PayloadAction<{
        territoryId: string
    }>): void => {
        const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
        territory.data.analysisTourLeft = 0;
        territory.data.isAnalysed = true;
    },
    completeColonization: (state: TerritorySliceState, action: PayloadAction<{
        territoryId: string
    }>): void => {
        const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
        territory.data.isColonized = true;
    },
    analysePlanet: (state: TerritorySliceState, action: PayloadAction<{territoryId: string, power: number}>): void => {
        const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
        territory.data.analysisTourLeft -= action.payload.power;
        territory.data.analysisTourLeft = Math.max(territory.data.analysisTourLeft, 0);
        if (territory.data.analysisTourLeft === 0) {
            territory.data.isAnalysed = true;
        }
    },
    setWaterPercentage: (state: TerritorySliceState, action: PayloadAction<{
        territoryId: string,
        value: number
    }>): void => {
        const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
        territory.data.water = action.payload.value;
    },
    setSunlightPercentage: (state: TerritorySliceState, action: PayloadAction<{
        territoryId: string,
        value: number
    }>): void => {
        const territory: TerritoryState<PlanetState> = state.territories.find((el: TerritoryState) => el.id === action.payload.territoryId);
        territory.data.sunlight = action.payload.value;
    }
};
