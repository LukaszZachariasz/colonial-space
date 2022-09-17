import {
    AnalysisShipGeneratorService
} from '../../../../../game-generator/unit-generator/analysis-ship-generator/analysis-ship-generator.service';
import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../store/player/player.selectors';

@Injectable()
@HasTourBlockers()
@HasTourEffects()
export class AnalysisShipBuildingHandlerService extends UnitHandlerService {
    @Inject(AnalysisShipGeneratorService) private analysisShipGeneratorService: AnalysisShipGeneratorService;

    constructor() {
        super(BuildingObjectType.ANALYSIS_SHIP);
    }

    public createUnitState(): UnitState {
        return this.analysisShipGeneratorService.generate(selectPlayerId());
    }
}
