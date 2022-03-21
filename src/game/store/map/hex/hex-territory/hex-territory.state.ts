import {HexTerritoryType} from './hex-territory-type';

export class HexTerritoryState<T extends { } = any> {
    public type: HexTerritoryType;
    public data: T = {} as T;
}
