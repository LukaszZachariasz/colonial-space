import {HexTerritoryState} from '../../game-state/map/hex/hex-territory/hex-territory.state';
import {PlanetData} from '../../game-state/map/hex/hex-territory/planet/planet-data';
import {PlayerState} from '../../game-state/player/player.state';
import {v4 as uuid} from 'uuid';

export class PlayerGenerator {
    public generate(): PlayerState {
        return {
            id: uuid(),
            name: 'Player 1'
        };
    }

    public assignRandomPlanetToPlayer(player: PlayerState, planets: HexTerritoryState<PlanetData>[], amount: number): void {
        for (let i = 0; i < amount; i++) {
            const random = planets[Math.floor(Math.random() * planets.length)];
            random.data.playerId = player.id;

            planets = planets.filter((el: HexTerritoryState<PlanetData>) => el != random);
        }
    }
}