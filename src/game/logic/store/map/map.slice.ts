import {MapState} from './map.state';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {SquareState} from './square/square.state';
import {logic} from '../../../game';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        skyboxType: undefined,
        squares: []
    } as MapState,
    reducers: {
        setMap: (state: MapState, action: PayloadAction<MapState>) => {
            state.skyboxType = action.payload.skyboxType;
            state.squares = action.payload.squares;
        },
        setSquareTerritoryId: (state: MapState, action: PayloadAction<{
            squareId: string,
            territoryId: string
        }>) => {
            state.squares.forEach((squares: SquareState[]) => {
                squares.forEach((square: SquareState) => {
                    if (square.id === action.payload.squareId) {
                        square.territoryId = action.payload.territoryId;
                    }
                });
            });
        },
        setSquareUnitId: (state: MapState, action: PayloadAction<{
            squareId: string,
            unitId: string
        }>) => {
            state.squares.forEach((squares: SquareState[]) => {
                squares.forEach((square: SquareState) => {
                    if (square.id === action.payload.squareId) {
                        square.unitId = action.payload.unitId;
                    }
                });
            });
        },
        setSquarePlayerId: (state: MapState, action: PayloadAction<{
            squareId: string,
            playerId: string
        }>) => {
            state.squares.forEach((squares: SquareState[]) => {
                squares.forEach((square: SquareState) => {
                    if (square.id === action.payload.squareId) {
                        square.playerId = action.payload.playerId;
                    }
                });
            });
        },
        removeFogOfWar: (state: MapState, action: PayloadAction<{
            position: {
                x: number,
                y: number
            },
            range: number
        }>) => {
            for (let i = action.payload.position.x - action.payload.range; i < action.payload.position.x + action.payload.range + 1; i++) {
                for (let j = action.payload.position.y - action.payload.range; j < action.payload.position.y + action.payload.range + 1; j++) {
                    if (j >= 0 && j <= state.squares.length && i >= 0 && i <= state.squares[0].length) {
                        if (state.squares[j][i].fogOfWar) {
                            state.squares[j][i].fogOfWar = false;
                            logic().fogOfWarService.removeFogOfWar$.next(state.squares[j][i].id);
                        }
                    }
                }
            }
        }
    }
});

export const {
    setMap,
    setSquareTerritoryId,
    setSquareUnitId,
    setSquarePlayerId,
    removeFogOfWar
} = mapSlice.actions;
