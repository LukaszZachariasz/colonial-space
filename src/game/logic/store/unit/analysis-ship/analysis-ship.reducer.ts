import {AnalysisShipState} from './analysis-ship.state';
import {PayloadAction} from '@reduxjs/toolkit';
import {UnitSliceState} from '../unit.slice';
import {UnitState} from '../unit.state';

export const analysisShipReducer = {
    startAnalyse: (state: UnitSliceState, action: PayloadAction<UnitState>): void => {
        const unit: UnitState<AnalysisShipState> = state.units.find((el: UnitState) => el.id === action.payload.id);
        unit.data.isAnalysing = true;
    },
    stopAnalyse: (state: UnitSliceState, action: PayloadAction<UnitState>): void => {
        const unit: UnitState<AnalysisShipState> = state.units.find((el: UnitState) => el.id === action.payload.id);
        unit.data.isAnalysing = false;
    },
};
