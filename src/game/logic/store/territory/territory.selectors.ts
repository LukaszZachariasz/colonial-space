import {TerritoryState} from './territory.state';
import {store} from '../store';

export const selectTerritories = (): TerritoryState[] => store.getState().territory.territories;
export const selectTerritoryById = (id: string): TerritoryState => selectTerritories().find((el: TerritoryState) => el.id === id);
