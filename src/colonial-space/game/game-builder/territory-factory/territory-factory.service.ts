import * as BABYLON from 'babylonjs';
import {AsteroidVolcanicModel} from '../../space-scene/territory/asteroid/asteroid-volcanic/asteroid-volcanic.model';
import {BlackHoleModel} from '../../space-scene/territory/black-hole/black-hole.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {PlanetGreenModel} from '../../space-scene/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../space-scene/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../space-scene/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../space-scene/territory/planet/planet-sand/planet-sand.model';
import {SatelliteMoonModel} from '../../space-scene/territory/satellite/satellite-moon/satellite-moon.model';
import {StarSolarModel} from '../../space-scene/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../space-scene/territory/territory.model';
import {TerritoryState} from '../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../game-logic/store/territory/territory-type';

@Injectable()
export class TerritoryFactoryService {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;

    public create(scene: BABYLON.Scene, territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return this.modelManagerService.addImportModel(new PlanetGreenModel(scene, territoryState));
            case TerritoryType.PLANET_SAND:
                return this.modelManagerService.addImportModel(new PlanetSandModel(scene, territoryState));
            case TerritoryType.PLANET_RINGED:
                return this.modelManagerService.addImportModel(new PlanetRingedModel(scene, territoryState));
            case TerritoryType.PLANET_METAL:
                return this.modelManagerService.addImportModel(new PlanetMetalModel(scene, territoryState));
            case TerritoryType.STAR_SOLAR:
                return this.modelManagerService.addImportModel(new StarSolarModel(scene, territoryState));
            case TerritoryType.BLACK_HOLE:
                return this.modelManagerService.addImportModel(new BlackHoleModel(scene, territoryState));
            case TerritoryType.SATELLITE_MOON:
                return this.modelManagerService.addImportModel(new SatelliteMoonModel(scene, territoryState));
            case TerritoryType.ASTEROID_VOLCANIC:
                return this.modelManagerService.addImportModel(new AsteroidVolcanicModel(scene, territoryState));
        }
    }
}
