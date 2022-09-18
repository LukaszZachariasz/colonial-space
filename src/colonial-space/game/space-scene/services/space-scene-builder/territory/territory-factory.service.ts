import {AsteroidVolcanicModel} from '../../../model/territory/asteroid/asteroid-volcanic/asteroid-volcanic.model';
import {BlackHoleModel} from '../../../model/territory/black-hole/black-hole.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {PlanetGreenModel} from '../../../model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../../model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../../model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../../model/territory/planet/planet-sand/planet-sand.model';
import {SatelliteMoonModel} from '../../../model/territory/satellite/satellite-moon/satellite-moon.model';
import {StarSolarModel} from '../../../model/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../../model/territory/territory.model';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';

@Injectable()
export class TerritoryFactoryService {
    @Inject(ModelManager) private modelManager: ModelManager;

    public create(territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return this.modelManager.addImportModel(PlanetGreenModel, territoryState);
            case TerritoryType.PLANET_SAND:
                return this.modelManager.addImportModel(PlanetSandModel, territoryState);
            case TerritoryType.PLANET_RINGED:
                return this.modelManager.addImportModel(PlanetRingedModel, territoryState);
            case TerritoryType.PLANET_METAL:
                return this.modelManager.addImportModel(PlanetMetalModel, territoryState);
            case TerritoryType.STAR_SOLAR:
                return this.modelManager.addImportModel(StarSolarModel, territoryState);
            case TerritoryType.BLACK_HOLE:
                return this.modelManager.addImportModel(BlackHoleModel, territoryState);
            case TerritoryType.SATELLITE_MOON:
                return this.modelManager.addImportModel(SatelliteMoonModel, territoryState);
            case TerritoryType.ASTEROID_VOLCANIC:
                return this.modelManager.addImportModel(AsteroidVolcanicModel, territoryState);
        }
    }
}
