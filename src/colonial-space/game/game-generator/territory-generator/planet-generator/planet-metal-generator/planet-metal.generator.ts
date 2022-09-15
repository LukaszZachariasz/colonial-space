import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {PlanetRingedState} from '../../../../game-logic/store/territory/planet/planet-ringed/planet-ringed.state';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetMetalGenerator {
    public static generate(): TerritoryState<PlanetRingedState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_METAL,
            icon: GameIcon.PLANET,
            name: PlanetNameGenerator.generate(),
            artUrl: './resources/territory/planet/planet-metal/planet-art.png',
            data: {
                basicProduction: 0,
                isAnalysed: false,
                analysisTourLeft: Math.floor(BABYLON.Scalar.RandomRange(15, 25)),
                isColonized: false,
                buildingId: null,

                water: 0,
                sunlight: 10,
                pollution: Math.floor(BABYLON.Scalar.RandomRange(25, 30))
            }
        };
    }
}
