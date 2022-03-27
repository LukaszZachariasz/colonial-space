import {UnitState} from './unit.state';
import {store} from '../store';

export const selectUnits = (): UnitState[] => store.getState().unit.units;
export const selectUnitById = (id: string): UnitState => store.getState().unit.units.find((unit: UnitState) => unit.id === id);
