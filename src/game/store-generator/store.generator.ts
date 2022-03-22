import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {Store} from '../store/store';
import {TourGenerator} from './tour-generator/tour-generator';

export class StoreGenerator {
    private mapGenerator: MapGenerator = new MapGenerator();
    private playerGenerator: PlayerGenerator = new PlayerGenerator();
    private tourGenerator: TourGenerator = new TourGenerator();

    public generate(): Store {
        const tour = this.tourGenerator.generate(); // Must be first due to tour effects
        const player = this.playerGenerator.generate();
        const map = this.mapGenerator.generate(player);

        return {
            player: player,
            map: map,
            tour: tour
        };
    }
}
