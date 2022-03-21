import {PlayerState} from '../../store/player/player.state';
import {ScoutShipState} from '../../store/unit/scout/scout-ship.state';
import {UnitState} from '../../store/unit/unit.state';

export class UnitGenerator {
    public generate(playerState: PlayerState): UnitState {
        const scout = new ScoutShipState();
        scout.playerId = playerState.id;
        return scout;
    }
}