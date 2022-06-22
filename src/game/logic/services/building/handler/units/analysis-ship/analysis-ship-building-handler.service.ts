import {AnalysisShipModel} from '../../../../../../scene/space/model/unit/analysis-ship/analysis-ship.model';
import {BuildingObjectType} from '../../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../../scene/space/model/unit/unit.model';
import {sceneManager} from 'engine';
import {selectUnitById} from '../../../../../store/unit/unit.selectors';

@HasTourBlockers()
@HasTourEffects()
export class AnalysisShipBuildingHandlerService extends UnitHandlerService {
    constructor() {
        super(BuildingObjectType.ANALYSIS_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new AnalysisShipModel(sceneManager().currentBabylonScene, selectUnitById(id));
    }
}
