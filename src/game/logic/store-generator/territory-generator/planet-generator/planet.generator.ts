import {PlanetGreenState} from '../../../store/territory/planet/planet-green/planet-green.state';
import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {TerritoryState} from '../../../store/territory/territory.state';
import {TerritoryType} from '../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetGenerator {
    private static readonly Planets = 10;

    public generate(): TerritoryState<PlanetGreenState>[] {
        const planets: TerritoryState<PlanetGreenState>[] = [];
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState: TerritoryState<PlanetGreenState> = {
                id: uuid(),
                type: TerritoryType.PLANET_GREEN,
                name: PlanetNameGenerator.generate(),
                artUrl: './resources/territory/planet/planet-art.png',
                data: {
                    basicProduction: 0,
                    water: Math.floor(BABYLON.Scalar.RandomRange(40,60)),
                    sunlight: Math.floor(BABYLON.Scalar.RandomRange(40,60)),
                    buildingId: null
                }
            };
            planets.push(planetState);
        }
        return planets;
    }
}
