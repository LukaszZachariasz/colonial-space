import {HexTerritoryModel} from './hex-territory.model';
import {HexTerritoryTypeEnum} from './hex-territory-type.enum';
import {PlanetModel} from './planet/planet.model';

export class HexTerritoryFactory {
    public create(type: HexTerritoryTypeEnum): HexTerritoryModel {
        switch (type) {
            case HexTerritoryTypeEnum.PLANET:
                return new PlanetModel();
        }
    }
}
