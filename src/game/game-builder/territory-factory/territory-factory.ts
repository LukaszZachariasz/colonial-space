import * as BABYLON from 'babylonjs';
import {PlanetGreenModel} from '../../scene/space/model/territory/planet/planet-green/planet-green.model';
import {PlanetMetalModel} from '../../scene/space/model/territory/planet/planet-metal/planet-metal.model';
import {PlanetRingedModel} from '../../scene/space/model/territory/planet/planet-ringed/planet-ringed.model';
import {PlanetSandModel} from '../../scene/space/model/territory/planet/planet-sand/planet-sand.model';
import {TerritoryModel} from '../../scene/space/model/territory/territory.model';
import {TerritoryState} from '../../logic/store/territory/territory.state';
import {TerritoryType} from '../../logic/store/territory/territory-type';

export class TerritoryFactory {
    public static create(scene: BABYLON.Scene, territoryState: TerritoryState): TerritoryModel {
        switch (territoryState.type) {
            case TerritoryType.PLANET_GREEN:
                return new PlanetGreenModel(scene, territoryState);
            case TerritoryType.PLANET_SAND:
                return new PlanetSandModel(scene, territoryState);
            case TerritoryType.PLANET_RINGED:
                return new PlanetRingedModel(scene, territoryState);
            case TerritoryType.PLANET_METAL:
                return new PlanetMetalModel(scene, territoryState);
        }
    }
}