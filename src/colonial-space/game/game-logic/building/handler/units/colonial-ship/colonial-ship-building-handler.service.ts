import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {
    ColonialShipGeneratorService
} from '../../../../../game-generator/unit-generator/colonial-ship-generator/colonial-ship-generator.service';
import {ColonialShipModel} from '../../../../../space-scene/model/unit/colonial-ship/colonial-ship.model';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../space-scene/model/unit/unit.model';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../store/player/player.selectors';
import {selectUnitById} from '../../../../store/unit/unit.selectors';

@Injectable()
@HasTourBlockers()
@HasTourEffects()
export class ColonialShipBuildingHandlerService extends UnitHandlerService {
    @Inject(ColonialShipGeneratorService) private colonialShipGeneratorService: ColonialShipGeneratorService;

    constructor() {
        super(BuildingObjectType.COLONIAL_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new ColonialShipModel(selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return this.colonialShipGeneratorService.generate(selectPlayerId());
    }
}
