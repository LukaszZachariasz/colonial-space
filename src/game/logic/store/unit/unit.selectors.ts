import {UnitState} from './unit.state';
import {UnitType} from './unit-type';
import {selectSquareByTerritoryId} from '../map/square/square.selectors';
import {store} from '../store';

export const selectUnits = (): UnitState[] => store.getState().unit.units;
export const selectUnitById = (id: string): UnitState => store.getState().unit.units.find((unit: UnitState) => unit.id === id);
export const selectUnitsByType = (type: UnitType): UnitState[] => store.getState().unit.units.filter((unit: UnitState) => unit.type === type);
export const selectUnitByTerritoryId = (territoryId: string): UnitState => selectUnitById(selectSquareByTerritoryId(territoryId).unitId);
