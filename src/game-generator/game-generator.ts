import {GameState} from '../game-state/game.state';
import {MapGenerator} from './map-generator/map-generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {TourGenerator} from './tour-generator/tour-generator';

export class GameGenerator {
    private mapGenerator: MapGenerator = new MapGenerator();
    private playerGenerator: PlayerGenerator = new PlayerGenerator();
    private tourGenerator: TourGenerator = new TourGenerator();

    public generate(): GameState {
        const tour = this.tourGenerator.generate(); // Must be first due to tour effects
        const player = this.playerGenerator.generate();
        const map = this.mapGenerator.generate(player);

        this.playerGenerator.assignRandomPlanetToPlayer(player, map.getPlanets(), 1);

        return {
            player: player,
            map: map,
            tour: tour
        };
    }
}
