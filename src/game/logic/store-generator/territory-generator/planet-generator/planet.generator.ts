import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/territory/planet/planet.state';
import {TerritoryState} from '../../../store/territory/territory.state';
import {TerritoryType} from '../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetGenerator {
    private static readonly Planets = 10;

    public generate(): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState: TerritoryState<PlanetState> = {
                id: uuid(),
                type: TerritoryType.PLANET,
                name: PlanetNameGenerator.generate(),
                data: {
                    name: PlanetNameGenerator.generate()
                }
            };
            planets.push(planetState);
        }
        return planets;
    }
}
