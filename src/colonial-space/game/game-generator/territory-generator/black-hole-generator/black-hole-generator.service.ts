import {BlackHoleNameGeneratorService} from './black-hole-name/black-hole-name-generator.service';
import {BlackHoleState} from '../../../game-logic/store/territory/black-hole/black-hole.state';
import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class BlackHoleGeneratorService {
    @Inject(BlackHoleNameGeneratorService) private blackHoleNameGeneratorService: BlackHoleNameGeneratorService;
    
    private static readonly BlackHoles = 1;

    public generate(): TerritoryState<BlackHoleState>[] {
        const blackHoles: TerritoryState<BlackHoleState>[] = [];

        for (let i = 0; i < BlackHoleGeneratorService.BlackHoles; i++) {
            blackHoles.push({
                id: uuid(),
                type: TerritoryType.BLACK_HOLE,
                icon: GameIcon.WIND_HOLE,
                name: this.blackHoleNameGeneratorService.generate(),
                artUrl: './resources/territory/black-hole/black-hole-art.png',
                data: {}
            });
        }

        return blackHoles;
    }
}
