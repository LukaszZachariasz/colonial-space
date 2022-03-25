import {ScoutShipModel} from './scout-ship/scout-ship.model';
import {UnitModel} from './unit.model';
import {UnitState} from '../../../../store/unit/unit.state';
import {UnitType} from '../../../../store/unit/unit-type';

export class UnitFactory {
    public create(type: UnitType, state: UnitState): UnitModel {
        switch (type) {
            case UnitType.SCOUT:
                return new ScoutShipModel(state as any);
        }
    }
}
