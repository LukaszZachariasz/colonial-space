import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {selectTerritoryById} from '../territory/territory.selectors';
import {MapState} from './map.state';
import {SquareState} from './square/square.state';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        skyboxType: undefined,
        squares: []
    } as MapState,
    reducers: {
        setMap: (state: Draft<MapState>, action: PayloadAction<MapState>) => {
            state.skyboxType = action.payload.skyboxType;
            state.squares = action.payload.squares;
        },
        setSquareTerritoryId: (state: Draft<MapState>, action: PayloadAction<{
            squareId: string,
            territoryId: string
        }>) => {
            state.squares.forEach((squares: Draft<SquareState[]>) => {
                squares.forEach((square: Draft<SquareState>) => {
                    if (square.id === action.payload.squareId) {
                        square.territoryId = action.payload.territoryId;
                    }
                });
            });
        },
        setSquareUnitId: (state: Draft<MapState>, action: PayloadAction<{
            squareId: string,
            unitId: string
        }>) => {
            state.squares.forEach((squares: Draft<SquareState[]>) => {
                squares.forEach((square: Draft<SquareState>) => {
                    if (square.id === action.payload.squareId) {
                        square.unitId = action.payload.unitId;
                    }
                });
            });
        },
        setSquarePlayerId: (state: Draft<MapState>, action: PayloadAction<{
            squareId: string,
            playerId: string
        }>) => {
            state.squares.forEach((squares: Draft<SquareState[]>) => {
                squares.forEach((square: Draft<SquareState>) => {
                    if (square.id === action.payload.squareId) {
                        square.playerId = action.payload.playerId;
                    }
                });
            });
        }
    }
});

export const {
    setMap,
    setSquareTerritoryId,
    setSquareUnitId,
    setSquarePlayerId
} = mapSlice.actions;
