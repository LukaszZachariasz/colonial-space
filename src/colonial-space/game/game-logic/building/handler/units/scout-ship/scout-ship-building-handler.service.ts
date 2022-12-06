import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {
    ScoutShipGeneratorService
} from '../../../../../game-generator/unit-generator/scout-ship-generator/scout-ship-generator.service';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../store/player/player.selectors';

@Injectable()
@HasTourBlockers()
@HasTourEffects()
export class ScoutShipBuildingHandlerService extends UnitHandlerService {
    @Inject(ScoutShipGeneratorService) private scoutShipGeneratorService: ScoutShipGeneratorService;
    
    constructor() {
        super(BuildingObjectType.SCOUT_SHIP);
    }

    public createUnitState(): UnitState {
        return this.scoutShipGeneratorService.generate(selectPlayerId());
    }
}
