import * as BABYLON from 'babylonjs';
import {AnalysisShipModel} from '../../space-scene/unit/analysis-ship/analysis-ship.model';
import {ColonialShipModel} from '../../space-scene/unit/colonial-ship/colonial-ship.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {ScoutShipModel} from '../../space-scene/unit/scout-ship/scout-ship.model';
import {UnitModel} from '../../space-scene/unit/unit.model';
import {UnitState} from '../../game-logic/store/unit/unit.state';
import {UnitType} from '../../game-logic/store/unit/unit-type';

@Injectable()
export class UnitFactoryService {
    @Inject(ModelManager) private modelManagerService: ModelManager;

    public create(scene: BABYLON.Scene, unitState: UnitState): UnitModel {
        switch (unitState.type) {
            case UnitType.SCOUT:
                return this.modelManagerService.addImportModel(new ScoutShipModel(scene, unitState));
            case UnitType.ANALYSIS:
                return this.modelManagerService.addImportModel(new AnalysisShipModel(scene, unitState));
            case UnitType.COLONIAL:
                return this.modelManagerService.addImportModel(new ColonialShipModel(scene, unitState));
        }
    }
}
