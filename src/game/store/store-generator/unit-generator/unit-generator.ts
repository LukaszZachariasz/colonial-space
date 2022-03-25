import {ScoutShipState} from '../../unit/scout/scout-ship.state';
import {SquareState} from '../../map/square/square.state';
import {UnitState} from '../../unit/unit.state';

export class UnitGenerator {
    public generate(square: SquareState): UnitState[] {
        const scout = new ScoutShipState();

        scout.squareId = square.id;
        square.unitId = scout.id;

        return [scout];
    }
}
