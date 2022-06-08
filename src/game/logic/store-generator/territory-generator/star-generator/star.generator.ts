import {StarSolarGenerator} from './star-solar-generator/star-solar.generator';
import {StarState} from '../../../store/territory/star/star.state';
import {TerritoryState} from '../../../store/territory/territory.state';

export class StarGenerator {
    private static readonly StarsSolar = 1;

    public static generate(): TerritoryState<StarState>[] {
        const stars: TerritoryState<StarState>[] = [];

        for (let i = 0; i < StarGenerator.StarsSolar; i++) {
            stars.push(StarSolarGenerator.generate());
        }

        return stars;
    }
}
