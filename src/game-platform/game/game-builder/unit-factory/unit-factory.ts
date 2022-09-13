import * as BABYLON from 'babylonjs';
import {AnalysisShipModel} from '../../scene/space/model/unit/analysis-ship/analysis-ship.model';
import {ColonialShipModel} from '../../scene/space/model/unit/colonial-ship/colonial-ship.model';
import {ScoutShipModel} from '../../scene/space/model/unit/scout-ship/scout-ship.model';
import {UnitModel} from '../../scene/space/model/unit/unit.model';
import {UnitState} from '../../logic/store/unit/unit.state';
import {UnitType} from '../../logic/store/unit/unit-type';
import {modelManager} from 'engine';

export class UnitFactory {
    public static create(scene: BABYLON.Scene, unitState: UnitState): UnitModel {
        switch (unitState.type) {
            case UnitType.SCOUT:
                return modelManager().addImportModel(new ScoutShipModel(scene, unitState));
            case UnitType.ANALYSIS:
                return modelManager().addImportModel(new AnalysisShipModel(scene, unitState));
            case UnitType.COLONIAL:
                return modelManager().addImportModel(new ColonialShipModel(scene, unitState));
        }
    }
}
