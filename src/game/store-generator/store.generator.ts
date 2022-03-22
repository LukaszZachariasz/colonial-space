import {HexState} from '../store/map/hex/hex.state';
import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
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
        const territories = this.territoryGenerator.generate(map.hexes.flat());
        const units = this.unitGenerator.generate(map.hexes.flat().find((el: HexState) => el.id === territories[0].hexId));

        map.hexes.flat().find((el: HexState) => el.id === territories[0].hexId).playerId = player.id;
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
