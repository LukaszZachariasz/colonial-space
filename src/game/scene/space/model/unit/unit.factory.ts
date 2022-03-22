import {ScoutShipModel} from './scout-ship/scout-ship.model';
import {UnitModel} from './unit.model';
import {UnitType} from '../../../../store/unit/unit-type';

export class UnitFactory {
    public create(type: UnitType): UnitModel {
        switch (type) {
            case UnitType.SCOUT:
                return new ScoutShipModel();
        }
    }
}
