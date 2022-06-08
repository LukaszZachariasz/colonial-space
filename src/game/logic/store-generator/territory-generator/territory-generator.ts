import {PlanetGenerator} from './planet-generator/planet.generator';
import {TerritoryState} from '../../store/territory/territory.state';

export class TerritoryGenerator {
    public static generate(): TerritoryState[] {
        return PlanetGenerator.generate();
    }
}
