import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {MoonState} from '../../../../game-logic/store/territory/satellite/moon/moon.state';
import {SatelliteNameGeneratorService} from '../satellite-name/satellite-name-generator.service';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class SatelliteMoonGeneratorService {
    @Inject(SatelliteNameGeneratorService) private satelliteNameGeneratorService: SatelliteNameGeneratorService;

    public generate(): TerritoryState<MoonState> {
        return {
            id: uuid(),
            type: TerritoryType.SATELLITE_MOON,
            icon: GameIcon.SATELLITE,
            name: this.satelliteNameGeneratorService.generate(),
            artUrl: './resources/territory/satellite/satellite-moon/satellite-art.png',
            data: {}
        };
    }
}
