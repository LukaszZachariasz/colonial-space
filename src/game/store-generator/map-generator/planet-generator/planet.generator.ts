import {HexState} from '../../../store/map/hex/hex.state';
import {HexTerritoryState} from '../../../store/map/hex/hex-territory/hex-territory.state';
import {HexTerritoryType} from '../../../store/map/hex/hex-territory/hex-territory-type';
import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/map/hex/hex-territory/planet/planet.state';
import {PlayerState} from '../../../store/player/player.state';

export class PlanetGenerator {
    private static readonly Planets = 1;

    public generate(player: PlayerState, hexes: HexState[][]): void {
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState = new HexTerritoryState<PlanetState>();
            planetState.type = HexTerritoryType.PLANET;
            planetState.data.name = PlanetNameGenerator.generate();

            hexes
                .flat()
                .filter((el: HexState) => el.territory == null)[Math.floor(Math.random() * hexes.flat().filter((el: HexState) => el.territory == null).length)]
                .territory = planetState;
        }
    }
}
