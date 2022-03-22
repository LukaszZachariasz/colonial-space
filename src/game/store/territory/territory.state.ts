import {TerritoryType} from './territory-type';

export class TerritoryState<T extends {} = any> {
    public type: TerritoryType;
    public data: T = {} as T;
    public playerId: string | undefined;
    public hexId: string;
}
