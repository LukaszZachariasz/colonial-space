import {HexState} from '../../store/map/hex/hex.state';
import {ScoutShipState} from '../../store/unit/scout/scout-ship.state';
import {UnitState} from '../../store/unit/unit.state';

export class UnitGenerator {
    public generate(hex: HexState): UnitState[] {
        const scout = new ScoutShipState();

        scout.hexId = hex.id;
        hex.unitId = scout.id;

        return [scout];
    }
}
