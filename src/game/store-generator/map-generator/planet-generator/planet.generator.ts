import {HexState} from '../../../store/map/hex/hex.state';
import {HexTerritoryState} from '../../../store/map/hex/hex-territory/hex-territory.state';
import {HexTerritoryType} from '../../../store/map/hex/hex-territory/hex-territory-type';
import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/map/hex/hex-territory/planet/planet.state';
import {PlayerState} from '../../../store/player/player.state';
import {UnitGenerator} from '../unit-generator/unit-generator';

export class PlanetGenerator {
    private static readonly Planets = 10;

    private unitGenerator: UnitGenerator = new UnitGenerator();

    public generate(player: PlayerState, hexes: HexState[][]): void {
        let assignedToPlayer = false;

        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState = new HexTerritoryState<PlanetState>();
            planetState.type = HexTerritoryType.PLANET;
            planetState.data.name = PlanetNameGenerator.generate();

            const randomHex = hexes
                    .flat()
                    .filter((el: HexState) => el.territory == null)[Math.floor(Math.random() * hexes.flat().filter((el: HexState) => el.territory == null).length)];

            randomHex.territory = planetState;

            if (!assignedToPlayer) {
                randomHex.playerId = player.id;
                assignedToPlayer = true;

                this.unitGenerator.generate(player, randomHex);
            }
        }
    }
}
