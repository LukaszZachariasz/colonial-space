import * as BABYLON from 'babylonjs';
import {PlanetGreenModel} from '../../scene/space/model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../scene/space/model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../scene/space/model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../scene/space/model/territory/planet/planet-sand/planet-sand.model';
import {StarSolarModel} from '../../scene/space/model/territory/star/star-solar/star-solar.model';
import {TerritoryModel} from '../../scene/space/model/territory/territory.model';
import {TerritoryState} from '../../logic/store/territory/territory.state';
import {TerritoryType} from '../../logic/store/territory/territory-type';
import {modelManager} from 'engine';

export class TerritoryFactory {
    public static create(scene: BABYLON.Scene, territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return modelManager().addModel(new PlanetGreenModel(scene, territoryState));
            case TerritoryType.PLANET_SAND:
                return modelManager().addModel(new PlanetSandModel(scene, territoryState));
            case TerritoryType.PLANET_RINGED:
                return modelManager().addModel(new PlanetRingedModel(scene, territoryState));
            case TerritoryType.PLANET_METAL:
                return modelManager().addModel(new PlanetMetalModel(scene, territoryState));
            case TerritoryType.STAR_SOLAR:
                return modelManager().addModel(new StarSolarModel(scene, territoryState));
        }
    }
}