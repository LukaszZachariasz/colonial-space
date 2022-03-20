import {HexTerritoryTypeEnum} from '../../../../scene/space/model/hex/hex-territory/hex-territory-type.enum';

export class HexTerritoryState<T extends { } = any> {
    public type: HexTerritoryTypeEnum;
    public data: T = {} as T;
}
