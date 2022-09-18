import {AnalysisShipModel} from '../../../model/unit/analysis-ship/analysis-ship.model';
import {ColonialShipModel} from '../../../model/unit/colonial-ship/colonial-ship.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {ScoutShipModel} from '../../../model/unit/scout-ship/scout-ship.model';
import {UnitModel} from '../../../model/unit/unit.model';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../../game-logic/store/unit/unit-type';

@Injectable()
export class UnitFactoryService {
    @Inject(ModelManager) private modelManager: ModelManager;

    public create(unitState: UnitState): UnitModel {
        switch (unitState.type) {
            case UnitType.SCOUT:
                return this.modelManager.addImportModel(ScoutShipModel, unitState);
            case UnitType.ANALYSIS:
                return this.modelManager.addImportModel(AnalysisShipModel, unitState);
            case UnitType.COLONIAL:
                return this.modelManager.addImportModel(ColonialShipModel, unitState);
        }
    }
}
