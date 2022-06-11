import {AnalysisShipState} from './analysis-ship.state';
import {PayloadAction} from '@reduxjs/toolkit';
import {UnitSliceState} from '../unit.slice';
import {UnitState} from '../unit.state';

export const analysisShipReducer = {
    startAnalyse: (state: UnitSliceState, action: PayloadAction<UnitState>): void => {
        const unit: UnitState<AnalysisShipState> = state.units.find((el: UnitState) => el.id === action.payload.id);
        unit.data.isAnalysing = true;
        unit.movementPlanning = [];
        unit.movementBlocked = true;
    },
    stopAnalyse: (state: UnitSliceState, action: PayloadAction<UnitState>): void => {
        const unit: UnitState<AnalysisShipState> = state.units.find((el: UnitState) => el.id === action.payload.id);
        unit.data.isAnalysing = false;
        unit.movementBlocked = false;
    },
    reduceAnalysis: (state: UnitSliceState, action: PayloadAction<UnitState>): void => {
        const unit: UnitState<AnalysisShipState> = state.units.find((el: UnitState) => el.id === action.payload.id);
        unit.data.analysisLeft -= unit.data.analysisPower;
        unit.data.analysisLeft = Math.max(0, unit.data.analysisLeft);
    },
};
