import {BuildingObjectType} from '../../../../../store/building/building-scope/building-object/building-object-type';
import {
    ColonialShipGenerator
} from '../../../../../store-generator/unit-generator/colonial-ship-generator/colonial-ship.generator';
import {ColonialShipModel} from '../../../../../../scene/space/model/unit/colonial-ship/colonial-ship.model';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {SceneManagerService} from '../../../../../../../../core/scene-manager/scene-manager.service';
import {Service} from 'typedi';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../../scene/space/model/unit/unit.model';
import {UnitState} from '../../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../../store/player/player.selectors';
import {selectUnitById} from '../../../../../store/unit/unit.selectors';

@HasTourBlockers()
@HasTourEffects()
@Service()
export class ColonialShipBuildingHandlerService extends UnitHandlerService {
    constructor(private sceneManagerService: SceneManagerService) {
        super(BuildingObjectType.COLONIAL_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new ColonialShipModel(this.sceneManagerService.currentBabylonScene, selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return ColonialShipGenerator.generate(selectPlayerId());
    }
}
