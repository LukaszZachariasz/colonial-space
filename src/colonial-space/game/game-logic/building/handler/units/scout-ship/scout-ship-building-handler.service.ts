import * as BABYLON from 'babylonjs';
import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {
    ScoutShipGeneratorService
} from '../../../../../game-generator/unit-generator/scout-ship-generator/scout-ship-generator.service';
import {ScoutShipModel} from '../../../../../space-scene/unit/scout-ship/scout-ship.model';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../space-scene/unit/unit.model';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../store/player/player.selectors';
import {selectUnitById} from '../../../../store/unit/unit.selectors';

@Injectable()
@HasTourBlockers()
@HasTourEffects()
export class ScoutShipBuildingHandlerService extends UnitHandlerService {
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    @Inject(ScoutShipGeneratorService) private scoutShipGeneratorService: ScoutShipGeneratorService;
    
    constructor() {
        super(BuildingObjectType.SCOUT_SHIP);
    }
    
    public createModel(id: string): UnitModel {
        return new ScoutShipModel(this.scene, selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return this.scoutShipGeneratorService.generate(selectPlayerId());
    }
}
