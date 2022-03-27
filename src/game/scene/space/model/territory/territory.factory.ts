import {PlanetModel} from './planet/planet.model';
import {TerritoryModel} from './territory.model';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';

export class TerritoryFactory {
    public create(territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET:
                return new PlanetModel(territoryState.id);
        }
    }
}
