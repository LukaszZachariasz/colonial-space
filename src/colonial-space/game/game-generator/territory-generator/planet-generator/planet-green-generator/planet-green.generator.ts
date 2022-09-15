import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {PlanetGreenState} from '../../../../game-logic/store/territory/planet/planet-green/planet-green.state';
import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetGreenGenerator {
    public static generate(): TerritoryState<PlanetGreenState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_GREEN,
            icon: GameIcon.PLANET,
            name: PlanetNameGenerator.generate(),
            artUrl: './resources/territory/planet/planet-green/planet-art.png',
            data: {
                basicProduction: 0,
                isAnalysed: false,
                analysisTourLeft: Math.floor(BABYLON.Scalar.RandomRange(3, 6)),
                isColonized: false,
                buildingId: null,

                water: Math.floor(BABYLON.Scalar.RandomRange(40, 60)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(40, 60)),
                pollution: Math.floor(BABYLON.Scalar.RandomRange(5, 10))
            }
        };
    }
}
