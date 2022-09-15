import {PlanetGreenGenerator} from './planet-green-generator/planet-green.generator';
import {PlanetMetalGenerator} from './planet-metal-generator/planet-metal.generator';
import {PlanetRingedGenerator} from './planet-ringed-generator/planet-ringed.generator';
import {PlanetSandGenerator} from './planet-sand-generator/planet-sand.generator';
import {PlanetState} from '../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

export class PlanetGenerator {
    private static readonly PlanetsGreen = 5;
    private static readonly PlanetsSand = 3;
    private static readonly PlanetsMetal = 1;
    private static readonly PlanetsRinged = 2;

    public static generate(): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];

        for (let i = 0; i < PlanetGenerator.PlanetsGreen; i++) {
            planets.push(PlanetGreenGenerator.generate());
        }

        for (let i = 0; i < PlanetGenerator.PlanetsSand; i++) {
            planets.push(PlanetSandGenerator.generate());
        }

        for (let i = 0; i < PlanetGenerator.PlanetsMetal; i++) {
            planets.push(PlanetMetalGenerator.generate());
        }

        for (let i = 0; i < PlanetGenerator.PlanetsRinged; i++) {
            planets.push(PlanetRingedGenerator.generate());
        }

        return planets;
    }
}
