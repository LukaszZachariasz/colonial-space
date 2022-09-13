import * as BABYLON from 'babylonjs';
import {
    AsteroidVolcanicModel
} from '../../scene/space/model/territory/asteroid/asteroid-volcanic/asteroid-volcanic.model';
import {BlackHoleModel} from '../../scene/space/model/territory/black-hole/black-hole.model';
import {PlanetGreenModel} from '../../scene/space/model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../scene/space/model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../scene/space/model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../scene/space/model/territory/planet/planet-sand/planet-sand.model';
import {SatelliteMoonModel} from '../../scene/space/model/territory/satellite/satellite-moon/satellite-moon.model';
import {StarSolarModel} from '../../scene/space/model/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../scene/space/model/territory/territory.model';
import {TerritoryState} from '../../logic/store/territory/territory.state';
import {TerritoryType} from '../../logic/store/territory/territory-type';
import {modelManager} from 'engine';

export class TerritoryFactory {
    public static create(scene: BABYLON.Scene, territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return modelManager().addImportModel(new PlanetGreenModel(scene, territoryState));
            case TerritoryType.PLANET_SAND:
                return modelManager().addImportModel(new PlanetSandModel(scene, territoryState));
            case TerritoryType.PLANET_RINGED:
                return modelManager().addImportModel(new PlanetRingedModel(scene, territoryState));
            case TerritoryType.PLANET_METAL:
                return modelManager().addImportModel(new PlanetMetalModel(scene, territoryState));
            case TerritoryType.STAR_SOLAR:
                return modelManager().addImportModel(new StarSolarModel(scene, territoryState));
            case TerritoryType.BLACK_HOLE:
                return modelManager().addImportModel(new BlackHoleModel(scene, territoryState));
            case TerritoryType.SATELLITE_MOON:
                return modelManager().addImportModel(new SatelliteMoonModel(scene, territoryState));
            case TerritoryType.ASTEROID_VOLCANIC:
                return modelManager().addImportModel(new AsteroidVolcanicModel(scene, territoryState));
        }
    }
}
