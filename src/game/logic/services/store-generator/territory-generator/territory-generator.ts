import {PlanetGenerator} from './planet-generator/planet.generator';
import {TerritoryState} from '../../../store/territory/territory.state';

export class TerritoryGenerator {
    private planetGenerator: PlanetGenerator = new PlanetGenerator();

    public generate(): TerritoryState[] {
        return this.planetGenerator.generate();
    }
}
