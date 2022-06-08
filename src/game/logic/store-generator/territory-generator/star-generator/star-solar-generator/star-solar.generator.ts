import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {SolarState} from '../../../../store/territory/star/solar/solar.state';
import {StarNameGenerator} from '../star-name/star-name.generator';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class StarSolarGenerator {
    public static generate(): TerritoryState<SolarState> {
        return {
            id: uuid(),
            type: TerritoryType.STAR_SOLAR,
            icon: GameIcon.SUN,
            name: StarNameGenerator.generate(),
            artUrl: './resources/territory/star/star-solar/star-art.png',
            data: {}
        };
    }
}