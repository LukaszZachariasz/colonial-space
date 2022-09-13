import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PlayerState} from './player.state';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        id: undefined,
        name: undefined,
        color: undefined
    } as PlayerState,
    reducers: {
        setPlayer: (state: Draft<PlayerState>, action: PayloadAction<PlayerState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.color = action.payload.color;
        }
    }
});

export const {setPlayer} = playerSlice.actions;
