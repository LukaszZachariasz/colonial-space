import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {PlanetGreenState} from '../../../../store/territory/planet/planet-green/planet-green.state';
import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
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
                water: Math.floor(BABYLON.Scalar.RandomRange(40, 60)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(40, 60)),
                buildingId: null
            }
        };
    }
}