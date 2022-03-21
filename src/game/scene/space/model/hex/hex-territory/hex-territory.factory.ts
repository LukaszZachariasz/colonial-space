import {HexTerritoryModel} from './hex-territory.model';
import {HexTerritoryType} from '../../../../../store/map/hex/hex-territory/hex-territory-type';
import {PlanetModel} from './planet/planet.model';

export class HexTerritoryFactory {
    public create(type: HexTerritoryType): HexTerritoryModel {
        switch (type) {
            case HexTerritoryType.PLANET:
                return new PlanetModel();
        }
    }
}
