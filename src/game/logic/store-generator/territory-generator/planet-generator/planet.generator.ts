import {PlanetGreenGenerator} from './planet-green-generator/planet-green.generator';
import {PlanetSandGenerator} from './planet-sand-generator/planet-sand.generator';
import {PlanetState} from '../../../store/territory/planet/planet.state';
import {TerritoryState} from '../../../store/territory/territory.state';

export class PlanetGenerator {
    private static readonly PlanetsGreen = 5;
    private static readonly PlanetsSand = 5;

    public static generate(): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];

        for (let i = 0; i < PlanetGenerator.PlanetsGreen; i++) {
            planets.push(PlanetGreenGenerator.generate());
        }

        for (let i = 0; i < PlanetGenerator.PlanetsSand; i++) {
            planets.push(PlanetSandGenerator.generate());
        }

        return planets;
    }
}
