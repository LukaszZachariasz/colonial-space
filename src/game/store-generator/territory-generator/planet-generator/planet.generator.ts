import {HexState} from '../../../store/map/hex/hex.state';
import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/territory/planet/planet.state';
import {TerritoryState} from '../../../store/territory/territory.state';
import {TerritoryType} from '../../../store/territory/territory-type';

export class PlanetGenerator {
    private static readonly Planets = 10;

    public generate(hexes: HexState[]): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState = new TerritoryState<PlanetState>();
            planetState.type = TerritoryType.PLANET;
            planetState.data.name = PlanetNameGenerator.generate();

            const randomHex = hexes.filter((el: HexState) => el.territoryId === undefined)[Math.floor(Math.random() * hexes.filter((el: HexState) => el.territoryId === undefined).length)];
            randomHex.territoryId = planetState.hexId;
            planetState.hexId = randomHex.id;

            planets.push(planetState);
        }
        return planets;
    }
}
