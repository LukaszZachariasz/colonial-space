import * as BABYLON from 'babylonjs';
import {AnalysisShipModel} from '../../scene/space/model/unit/analysis-ship/analysis-ship.model';
import {ColonialShipModel} from '../../scene/space/model/unit/colonial-ship/colonial-ship.model';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {ScoutShipModel} from '../../scene/space/model/unit/scout-ship/scout-ship.model';
import {Service} from 'typedi';
import {UnitModel} from '../../scene/space/model/unit/unit.model';
import {UnitState} from '../../logic/store/unit/unit.state';
import {UnitType} from '../../logic/store/unit/unit-type';

@Service()
export class UnitFactoryService {
    constructor(private modelManagerService: ModelManagerService) {
    }

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
