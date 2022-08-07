import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {PlanetSandState} from '../../../../store/territory/planet/planet-sand/planet-sand.state';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetSandGenerator {
    public static generate(): TerritoryState<PlanetSandState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_SAND,
            icon: GameIcon.PLANET,
            name: PlanetNameGenerator.generate(),
            artUrl: './resources/territory/planet/planet-sand/planet-art.png',
            data: {
                basicProduction: 0,
                isAnalysed: false,
                analysisTourLeft: Math.floor(BABYLON.Scalar.RandomRange(3, 6)),
                isColonized: false,
                buildingId: null,

                water: Math.floor(BABYLON.Scalar.RandomRange(10, 20)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(70, 90)),
                pollution: Math.floor(BABYLON.Scalar.RandomRange(5, 10))
            }
        };
    }
}
