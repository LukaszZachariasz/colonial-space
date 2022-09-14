import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UnitState} from './unit.state';
import {analysisShipReducer} from './analysis-ship/analysis-ship.reducer';

export interface UnitSliceState {
    units: UnitState[];
}

export const unitSlice = createSlice({
    name: 'unit',
    initialState: {
        units: []
    } as UnitSliceState,
    reducers: {
        addUnit: (state: UnitSliceState, action: PayloadAction<UnitState>) => {
            state.units.push(action.payload);
        },
        removeUnit: (state: UnitSliceState, action: PayloadAction<string>) => {
            state.units = state.units.filter((el: UnitState) => el.id != action.payload);
        },
        clearUnitPlanningMovement: (state: UnitSliceState, action: PayloadAction<string>) => {
            state.units.find((el: UnitState) => el.id === action.payload).movementPlanning = [];
        },
        addUnitPlanningMovement: (state: UnitSliceState, action: PayloadAction<{
            id: string,
            plannedMovementId: string
        }>) => {
            state.units.find((el: UnitState) => el.id === action.payload.id).movementPlanning.push(action.payload.plannedMovementId);
        },
        moveUnit: (state: UnitSliceState, action: PayloadAction<{
            id: string,
            amount: number
        }>) => {
            const unit = state.units.find((el: UnitState) => el.id === action.payload.id);
            unit.movementPointsLeft -= action.payload.amount;

            for (let i = 0; i < action.payload.amount; i++) {
                unit.movementPlanning.shift();
            }
        },
        refillUnits: (state: UnitSliceState) => {
            state.units.forEach((unit: UnitState) => {
                    unit.movementPointsLeft = unit.movementPoints;
                }
            );
        },
        ...analysisShipReducer
    }
});

export const {
    addUnit,
    removeUnit,
    clearUnitPlanningMovement,
    addUnitPlanningMovement,
    moveUnit,
    refillUnits,
    startAnalyse,
    stopAnalyse,
    reduceAnalysis
} = unitSlice.actions;