import * as BABYLON from 'babylonjs';
import {AsteroidVolcanicModel} from '../../../model/territory/asteroid/asteroid-volcanic/asteroid-volcanic.model';
import {BlackHoleModel} from '../../../model/territory/black-hole/black-hole.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {PlanetGreenModel} from '../../../model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../../model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../../model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../../model/territory/planet/planet-sand/planet-sand.model';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SatelliteMoonModel} from '../../../model/territory/satellite/satellite-moon/satellite-moon.model';
import {StarSolarModel} from '../../../model/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../../model/territory/territory.model';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';

@Injectable()
export class TerritoryFactoryService {
    @Inject(ModelManager) private modelManagerService: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;

    public create(territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return this.modelManagerService.addImportModel(PlanetGreenModel, this.scene, territoryState);
            case TerritoryType.PLANET_SAND:
                return this.modelManagerService.addImportModel(PlanetSandModel, this.scene, territoryState);
            case TerritoryType.PLANET_RINGED:
                return this.modelManagerService.addImportModel(PlanetRingedModel, this.scene, territoryState);
            case TerritoryType.PLANET_METAL:
                return this.modelManagerService.addImportModel(PlanetMetalModel, this.scene, territoryState);
            case TerritoryType.STAR_SOLAR:
                return this.modelManagerService.addImportModel(StarSolarModel, this.scene, territoryState);
            case TerritoryType.BLACK_HOLE:
                return this.modelManagerService.addImportModel(BlackHoleModel, this.scene, territoryState);
            case TerritoryType.SATELLITE_MOON:
                return this.modelManagerService.addImportModel(SatelliteMoonModel, this.scene, territoryState);
            case TerritoryType.ASTEROID_VOLCANIC:
                return this.modelManagerService.addImportModel(AsteroidVolcanicModel, this.scene, territoryState);
        }
    }
}
