import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/territory/planet/planet.state';
import {SquareState} from '../../../store/map/square/square.state';
import {TerritoryState} from '../../../store/territory/territory.state';
import {TerritoryType} from '../../../store/territory/territory-type';

export class PlanetGenerator {
    private static readonly Planets = 10;

    public generate(squares: SquareState[]): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState = new TerritoryState<PlanetState>();
            planetState.type = TerritoryType.PLANET;
            planetState.data.name = PlanetNameGenerator.generate();

            const randomSquare = squares.filter((el: SquareState) => el.territoryId === undefined)[Math.floor(Math.random() * squares.filter((el: SquareState) => el.territoryId === undefined).length)];
            randomSquare.territoryId = planetState.squareId;
            planetState.squareId = randomSquare.id;

            planets.push(planetState);
        }
        return planets;
    }
}
