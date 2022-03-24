import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {SquareState} from '../store/map/square/square.state';
import {Store} from '../store/store';
import {TerritoryGenerator} from './territory-generator/territory-generator';
import {TourGenerator} from './tour-generator/tour-generator';
import {UnitGenerator} from './unit-generator/unit-generator';

export class StoreGenerator {
    private mapGenerator: MapGenerator = new MapGenerator();
    private playerGenerator: PlayerGenerator = new PlayerGenerator();
    private territoryGenerator: TerritoryGenerator = new TerritoryGenerator();
    private tourGenerator: TourGenerator = new TourGenerator();
    private unitGenerator: UnitGenerator = new UnitGenerator();

    public generate(): Store {
        const tour = this.tourGenerator.generate(); // Must be first due to tour effects
        const map = this.mapGenerator.generate();
        const player = this.playerGenerator.generate();
        const territories = this.territoryGenerator.generate(map.squares.flat());
        const units = this.unitGenerator.generate(map.squares.flat().find((el: SquareState) => el.id === territories[0].squareId));

        map.squares.flat().find((el: SquareState) => el.id === territories[0].squareId).playerId = player.id;
        territories[0].playerId = player.id;
        units[0].playerId = player.id;

        return {
            player: player,
            map: map,
            tour: tour,
            territories: territories,
            units: units
        };
    }
}
