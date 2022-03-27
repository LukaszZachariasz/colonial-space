import {GlobalResourceState} from './global-resource.state';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export const globalResourceSlice = createSlice({
    name: 'globalResource',
    initialState: {
        scienceIncome: undefined,
        awarenessIncome: undefined,
        fuelIncome: undefined
    } as GlobalResourceState,
    reducers: {
        setGlobalResources: (state: GlobalResourceState, action: PayloadAction<GlobalResourceState>) => {
            state.scienceIncome = action.payload.scienceIncome;
            state.awarenessIncome = action.payload.awarenessIncome;
            state.fuelIncome = action.payload.fuelIncome;
        }
    }
});
