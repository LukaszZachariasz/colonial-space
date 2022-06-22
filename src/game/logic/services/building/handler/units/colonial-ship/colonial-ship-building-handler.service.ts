import {BuildingObjectType} from '../../../../../store/building/building-scope/building-object/building-object-type';
import {ColonialShipModel} from '../../../../../../scene/space/model/unit/colonial-ship/colonial-ship.model';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../../scene/space/model/unit/unit.model';
import {sceneManager} from 'engine';
import {selectUnitById} from '../../../../../store/unit/unit.selectors';

@HasTourBlockers()
@HasTourEffects()
export class ColonialShipBuildingHandlerService extends UnitHandlerService {
    constructor() {
        super(BuildingObjectType.COLONIAL_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new ColonialShipModel(sceneManager().currentBabylonScene, selectUnitById(id));
    }
}
