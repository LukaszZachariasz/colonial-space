import {TerritoryType} from './territory-type';

export interface TerritoryState<T extends {} = any> {
     id: string;
     type: TerritoryType;
     name: string;
     data: T;
}
