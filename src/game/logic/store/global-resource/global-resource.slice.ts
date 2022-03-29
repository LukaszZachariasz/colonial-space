import {GlobalResourceState} from './global-resource.state';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export const globalResourceSlice = createSlice({
    name: 'globalResource',
    initialState: {
        science: undefined,
        awareness: undefined,
        fuel: undefined
    } as GlobalResourceState,
    reducers: {
        setGlobalResources: (state: GlobalResourceState, action: PayloadAction<GlobalResourceState>) => {
            state.science = action.payload.science;
            state.awareness = action.payload.awareness;
            state.fuel = action.payload.fuel;
        }
    }
});

export const {setGlobalResources} = globalResourceSlice.actions;
