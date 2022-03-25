import {PlanetGenerator} from './planet-generator/planet.generator';
import {SquareState} from '../../map/square/square.state';
import {TerritoryState} from '../../territory/territory.state';

export class TerritoryGenerator {
    private planetGenerator: PlanetGenerator = new PlanetGenerator();

    public generate(squares: SquareState[]): TerritoryState[] {
        return this.planetGenerator.generate(squares);
    }
}
