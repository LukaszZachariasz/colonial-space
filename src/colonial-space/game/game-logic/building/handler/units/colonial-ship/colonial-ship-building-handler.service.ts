import * as BABYLON from 'babylonjs';
import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
import {
    ColonialShipGenerator
} from '../../../../../game-generator/unit-generator/colonial-ship-generator/colonial-ship.generator';
import {ColonialShipModel} from '../../../../../space-scene/unit/colonial-ship/colonial-ship.model';
import {HasTourBlockers} from '../../../../tour/tour-blocker/has-tour-blockers';
import {HasTourEffects} from '../../../../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {UnitHandlerService} from '../unit-handler.service';
import {UnitModel} from '../../../../../space-scene/unit/unit.model';
import {UnitState} from '../../../../store/unit/unit.state';
import {selectPlayerId} from '../../../../store/player/player.selectors';
import {selectUnitById} from '../../../../store/unit/unit.selectors';

@HasTourBlockers()
@HasTourEffects()
@Injectable()
export class ColonialShipBuildingHandlerService extends UnitHandlerService {
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    
    constructor() {
        super(BuildingObjectType.COLONIAL_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new ColonialShipModel(this.scene, selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return ColonialShipGenerator.generate(selectPlayerId());
    }
}