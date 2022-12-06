import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SolarState} from '../../../../game-logic/store/territory/star/solar/solar.state';
import {StarNameGeneratorService} from '../star-name/star-name-generator.service';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class StarSolarGeneratorService {
    @Inject(StarNameGeneratorService) private starNameGeneratorService: StarNameGeneratorService;

    public generate(): TerritoryState<SolarState> {
        return {
            id: uuid(),
            type: TerritoryType.STAR_SOLAR,
            icon: GameIcon.SUN,
            name: this.starNameGeneratorService.generate(),
            artUrl: './resources/territory/star/star-solar/star-art.png',
            data: {}
        };
    }
}
