import {HexTerritoryData} from './hex-territory-data';
import {HexTerritoryTypeEnum} from '../../../../game-objects/hex/hex-territory/hex-territory-type.enum';

export class HexTerritoryState<T extends HexTerritoryData> {
    public type: HexTerritoryTypeEnum;
    public data: T = {} as T;
}
