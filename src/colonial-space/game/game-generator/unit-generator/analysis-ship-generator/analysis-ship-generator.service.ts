import {AnalysisShipState} from '../../../game-logic/store/unit/analysis-ship/analysis-ship.state';
import {GameIcon} from '../../../space-scene/gui/shared/icon/game-icon';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../game-logic/store/unit/unit-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class AnalysisShipGeneratorService {
    public generate(playerId: string): UnitState<AnalysisShipState> {
        return {
            id: uuid(),
            name: 'Analysis ship',
            artUrl: 'resources/unit/analysis-ship/analysis-ship-art.png',
            type: UnitType.ANALYSIS,
            icon: GameIcon.LASER_TURRET,
            health: 1,
            playerId: playerId,
            movementPoints: 1,
            movementPointsLeft: 1,
            movementPlanning: [],
            isWorking: false,
            scoutRange: 1,
            data: {
                isAnalysing: false,
                analysisLeft: 5,
                analysisPower: 1
            }
        };
    }
}
