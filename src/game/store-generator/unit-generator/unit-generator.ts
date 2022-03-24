import {ScoutShipState} from '../../store/unit/scout/scout-ship.state';
import {SquareState} from '../../store/map/square/square.state';
import {UnitState} from '../../store/unit/unit.state';

export class UnitGenerator {
    public generate(square: SquareState): UnitState[] {
        const scout = new ScoutShipState();

        scout.squareId = square.id;
        square.unitId = scout.id;

        return [scout];
    }
}
