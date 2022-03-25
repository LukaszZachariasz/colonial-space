import {PlanetModel} from './planet/planet.model';
import {TerritoryModel} from './territory.model';
import {TerritoryType} from '../../../../store/territory/territory-type';

export class TerritoryFactory {
    public create(type: TerritoryType): TerritoryModel {
        switch (type) {
            case TerritoryType.PLANET:
                return new PlanetModel();
        }
    }
}
