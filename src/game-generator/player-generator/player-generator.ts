import {HexState} from '../../game-state/map/hex/hex.state';
import {PlayerState} from '../../game-state/player/player.state';
import {v4 as uuid} from 'uuid';

export class PlayerGenerator {
    public generate(): PlayerState {
        return {
            id: uuid(),
            name: 'Player 1',
            color: BABYLON.Color3.Random()
        };
    }

    public assignRandomHexWithPlanetToPlayer(player: PlayerState, hexWithPlanet: HexState[], amount: number): void {
        for (let i = 0; i < amount; i++) {
            const random = hexWithPlanet[Math.floor(Math.random() * hexWithPlanet.length)];
            random.playerId = player.id;

            hexWithPlanet = hexWithPlanet.filter((el: HexState) => el != random);
        }
    }
}
