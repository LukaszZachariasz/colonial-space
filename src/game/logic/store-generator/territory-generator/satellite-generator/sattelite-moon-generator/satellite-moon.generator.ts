import {GameIcon} from '../../../../../scene/space/gui/shared/icon/game-icon';
import {MoonState} from '../../../../store/territory/satellite/moon/moon.state';
import {SatelliteNameGenerator} from '../satellite-name/satellite-name.generator';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class SatelliteMoonGenerator {
    public static generate(): TerritoryState<MoonState> {
        return {
            id: uuid(),
            type: TerritoryType.SATELLITE_MOON,
            icon: GameIcon.SATELLITE,
            name: SatelliteNameGenerator.generate(),
            artUrl: './resources/territory/satellite/satellite-moon/satellite-art.png',
            data: {}
        };
    }
}
