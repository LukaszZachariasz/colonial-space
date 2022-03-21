import {HexState} from '../store/map/hex/hex.state';
import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {Store} from '../store/store';
import {TourGenerator} from './tour-generator/tour-generator';
import {UnitGenerator} from './unit-generator/unit-generator';
import {UnitState} from '../store/unit/unit.state';

export class StoreGenerator {
    private mapGenerator: MapGenerator = new MapGenerator();
    private playerGenerator: PlayerGenerator = new PlayerGenerator();
    private tourGenerator: TourGenerator = new TourGenerator();
    private unitGenerator: UnitGenerator = new UnitGenerator();

    public generate(): Store {
        const units: UnitState[] = [];

        const tour = this.tourGenerator.generate(); // Must be first due to tour effects
        const player = this.playerGenerator.generate();
        const map = this.mapGenerator.generate(player);

        units.push(this.unitGenerator.generate(player));

        this.playerGenerator.assignRandomHexWithPlanetToPlayer(player, units[0], map.hexes.flat().filter((el: HexState) => el.territory), 1);

        return {
            player: player,
            map: map,
            tour: tour,
            units: units
        };
    }
}
