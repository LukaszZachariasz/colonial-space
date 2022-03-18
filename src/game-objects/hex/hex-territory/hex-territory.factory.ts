import {HexTerritory} from './hex-territory';
import {HexTerritoryTypeEnum} from './hex-territory-type.enum';
import {Planet} from './planet/planet';

export class HexTerritoryFactory {
    public create(type: HexTerritoryTypeEnum): HexTerritory {
        switch (type) {
            case HexTerritoryTypeEnum.PLANET:
                return new Planet();
        }
    }
}