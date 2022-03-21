import {HexState} from '../../store/map/hex/hex.state';
import {PlayerState} from '../../store/player/player.state';
import {UnitState} from '../../store/unit/unit.state';
import {v4 as uuid} from 'uuid';

export class PlayerGenerator {
    public generate(): PlayerState {
        return {
            id: uuid(),
            name: 'Player 1',
            color: BABYLON.Color3.Random()
        };
    }

    public assignRandomHexWithPlanetToPlayer(player: PlayerState, unit: UnitState, hexWithPlanet: HexState[], amount: number): void {
        for (let i = 0; i < amount; i++) {
            const random = hexWithPlanet[Math.floor(Math.random() * hexWithPlanet.length)];
            random.playerId = player.id;
            random.unitId = unit.id;

            hexWithPlanet = hexWithPlanet.filter((el: HexState) => el != random);
        }
    }
}
