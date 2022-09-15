import {AsteroidState} from '../../../game-logic/store/territory/asteroid/asteroid.state';
import {AsteroidVolcanicGenerator} from './asteroid-volcanic/asteroid-volcanic.generator';
import {StarState} from '../../../game-logic/store/territory/star/star.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

export class AsteroidGenerator {
    private static readonly AsteroidVolcanic = 2;

    public static generate(): TerritoryState<AsteroidState>[] {
        const stars: TerritoryState<StarState>[] = [];

        for (let i = 0; i < AsteroidGenerator.AsteroidVolcanic; i++) {
            stars.push(AsteroidVolcanicGenerator.generate());
        }

        return stars;
    }
}
