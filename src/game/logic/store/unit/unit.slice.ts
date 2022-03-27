import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UnitState} from './unit.state';

interface UnitSliceState {
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
        clearUnitPlanningMovement: (state: UnitSliceState, action: PayloadAction<string>) => {
            state.units.find((el: UnitState) => el.id === action.payload).plannedMovement = [];
        },
        addUnitPlanningMovement: (state: UnitSliceState, action: PayloadAction<{
            id: string,
            plannedMovementId: string
        }>) => {
            state.units.find((el: UnitState) => el.id === action.payload.id).plannedMovement.push(action.payload.plannedMovementId);
        },
        moveUnit: (state: UnitSliceState, action: PayloadAction<{
            id: string,
            amount: number
        }>) => {
            const unit = state.units.find((el: UnitState) => el.id === action.payload.id);

            for (let i = 0; i < action.payload.amount; i++) {
                unit.plannedMovement.shift();
            }
        }
    }
});

export const {
    addUnit,
    clearUnitPlanningMovement,
    addUnitPlanningMovement,
    moveUnit
} = unitSlice.actions;
