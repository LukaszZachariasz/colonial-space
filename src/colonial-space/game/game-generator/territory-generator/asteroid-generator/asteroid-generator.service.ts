import {AsteroidState} from '../../../game-logic/store/territory/asteroid/asteroid.state';
import {AsteroidVolcanicGeneratorService} from './asteroid-volcanic/asteroid-volcanic-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {StarState} from '../../../game-logic/store/territory/star/star.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

@Injectable()
export class AsteroidGeneratorService {
    @Inject(AsteroidVolcanicGeneratorService) private asteroidVolcanicGenerator: AsteroidVolcanicGeneratorService;
    
    private static readonly AsteroidVolcanic = 2;

    public generate(): TerritoryState<AsteroidState>[] {
        const stars: TerritoryState<StarState>[] = [];

        for (let i = 0; i < AsteroidGeneratorService.AsteroidVolcanic; i++) {
            stars.push(this.asteroidVolcanicGenerator.generate());
        }

        return stars;
    }
}
