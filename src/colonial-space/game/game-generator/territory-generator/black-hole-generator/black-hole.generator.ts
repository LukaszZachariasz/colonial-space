import {BlackHoleNameGenerator} from './black-hole-name/black-hole-name.generator';
import {BlackHoleState} from '../../../game-logic/store/territory/black-hole/black-hole.state';
import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class BlackHoleGenerator {
    private static readonly BlackHoles = 1;

    public static generate(): TerritoryState<BlackHoleState>[] {
        const blackHoles: TerritoryState<BlackHoleState>[] = [];

        for (let i = 0; i < BlackHoleGenerator.BlackHoles; i++) {
            blackHoles.push({
                id: uuid(),
                type: TerritoryType.BLACK_HOLE,
                icon: GameIcon.WIND_HOLE,
                name: BlackHoleNameGenerator.generate(),
                artUrl: './resources/territory/black-hole/black-hole-art.png',
                data: {}
            });
        }

        return blackHoles;
    }
}
