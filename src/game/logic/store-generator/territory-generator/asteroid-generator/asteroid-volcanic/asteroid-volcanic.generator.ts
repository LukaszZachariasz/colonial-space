import {AsteroidNameGenerator} from '../asteroid-name/asteroid-name.generator';
import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {SolarState} from '../../../../store/territory/star/solar/solar.state';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class AsteroidVolcanicGenerator {
    public static generate(): TerritoryState<SolarState> {
        return {
            id: uuid(),
            type: TerritoryType.ASTEROID_VOLCANIC,
            icon: GameIcon.BURNING_METEOR,
            name: AsteroidNameGenerator.generate(),
            artUrl: './resources/territory/asteroid/asteroid-volcanic/asteroid-art.png',
            data: {}
        };
    }
}
