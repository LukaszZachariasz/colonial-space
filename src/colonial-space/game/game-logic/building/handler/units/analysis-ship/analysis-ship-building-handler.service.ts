import * as BABYLON from 'babylonjs';
import {
    AnalysisShipGenerator
} from '../../../../../game-generator/unit-generator/analysis-ship-generator/analysis-ship.generator';
import {AnalysisShipModel} from '../../../../../space-scene/unit/analysis-ship/analysis-ship.model';
import {BuildingObjectType} from '../../../../store/building/building-scope/building-object/building-object-type';
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
export class AnalysisShipBuildingHandlerService extends UnitHandlerService {
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    
    constructor() {
        super(BuildingObjectType.ANALYSIS_SHIP);
    }

    public createModel(id: string): UnitModel {
        return new AnalysisShipModel(this.scene, selectUnitById(id));
    }

    public createUnitState(): UnitState {
        return AnalysisShipGenerator.generate(selectPlayerId());
    }
}
