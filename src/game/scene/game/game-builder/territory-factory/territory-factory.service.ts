import * as BABYLON from 'babylonjs';
import {
    AsteroidVolcanicModel
} from '../../scene/space/model/territory/asteroid/asteroid-volcanic/asteroid-volcanic.model';
import {BlackHoleModel} from '../../scene/space/model/territory/black-hole/black-hole.model';
import {ModelManagerService} from '../../../../core/model-manager/model-manager.service';
import {PlanetGreenModel} from '../../scene/space/model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../scene/space/model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../scene/space/model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../scene/space/model/territory/planet/planet-sand/planet-sand.model';
import {SatelliteMoonModel} from '../../scene/space/model/territory/satellite/satellite-moon/satellite-moon.model';
import {Service} from 'typedi';
import {StarSolarModel} from '../../scene/space/model/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../scene/space/model/territory/territory.model';
import {TerritoryState} from '../../logic/store/territory/territory.state';
import {TerritoryType} from '../../logic/store/territory/territory-type';

@Service()
export class TerritoryFactoryService {
    constructor(private modelManagerService: ModelManagerService) {
    }

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
