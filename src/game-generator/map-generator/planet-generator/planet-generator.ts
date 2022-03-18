import {HexState} from '../../../game-state/map/hex/hex.state';
import {HexTerritoryState} from '../../../game-state/map/hex/hex-territory/hex-territory.state';
import {HexTerritoryTypeEnum} from '../../../game-objects/hex/hex-territory/hex-territory-type.enum';
import {PlanetData} from '../../../game-state/map/hex/hex-territory/planet/planet-data';
import {PlanetNameGenerator} from './planet-name-generator';
import {PlayerState} from '../../../game-state/player/player.state';

export class PlanetGenerator {
    private static readonly Planets = 20;

    public generate(player: PlayerState, hexes: HexState[][]): void {
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState = new HexTerritoryState<PlanetData>();
            planetState.type = HexTerritoryTypeEnum.PLANET;
            planetState.data.name = PlanetNameGenerator.generate();

            hexes
                .flat()
                .filter((el: HexState) => el.territory == null)[Math.floor(Math.random() * hexes.flat().filter((el: HexState) => el.territory == null).length)]
                .territory = planetState;
        }
    }
}
