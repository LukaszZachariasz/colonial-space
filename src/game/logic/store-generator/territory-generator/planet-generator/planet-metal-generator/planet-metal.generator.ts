import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {PlanetRingedState} from '../../../../store/territory/planet/planet-ringed/planet-ringed.state';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
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
                water: 0,
                sunlight: 10,
                buildingId: null
            }
        };
    }
}