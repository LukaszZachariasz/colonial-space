import {HexState} from '../../../store/map/hex/hex.state';
import {PlayerState} from '../../../store/player/player.state';
import {ScoutShipState} from '../../../store/map/hex/unit/scout/scout-ship.state';

export class UnitGenerator {
    public generate(playerState: PlayerState, hex: HexState): void {
        const scout = new ScoutShipState();
        scout.playerId = playerState.id;

        hex.unit = scout;
    }
}