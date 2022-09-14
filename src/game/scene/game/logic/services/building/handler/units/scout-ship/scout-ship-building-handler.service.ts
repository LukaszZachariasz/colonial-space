import {Service} from 'typedi';
import {SceneManagerService} from '../../../../../../../../core/scene-manager/scene-manager.service';
import {BuildingObjectType} from '../../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {
    ScoutShipGenerator
} from '../../../../../store-generator/unit-generator/scout-ship-generator/scout-ship.generator';
import {ScoutShipModel} from '../../../../../../scene/space/model/unit/scout-ship/scout-ship.model';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../../scene/space/model/unit/unit.model';
import {UnitState} from '../../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../../store/player/player.selectors';
import {selectUnitById} from '../../../../../store/unit/unit.selectors';

@HasTourBlockers()
@HasTourEffects()
@Service()
export class ScoutShipBuildingHandlerService extends UnitHandlerService {
    constructor(private sceneManagerService: SceneManagerService) {
        super(BuildingObjectType.SCOUT_SHIP);
    }
    
    public createModel(id: string): UnitModel {
        return new ScoutShipModel(this.sceneManagerService.currentBabylonScene, selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return ScoutShipGenerator.generate(selectPlayerId());
    }
}
