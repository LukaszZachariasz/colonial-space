import {AsteroidNameGenerator} from '../asteroid-name/asteroid-name.generator';
import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {SolarState} from '../../../../game-logic/store/territory/star/solar/solar.state';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class AsteroidVolcanicGenerator {
    public static generate(): TerritoryState<SolarState> {
        return {
            id: uuid(),
            type: TerritoryType.ASTEROID_VOLCANIC,
            icon: GameIcon.BURNING_METEOR,
            name: AsteroidNameGenerator.generate(),
            artUrl: './resources/territory/asteroid/asteroid-volcanic/asteroid-volcanic-art.png',
            data: {}
        };
    }
}
