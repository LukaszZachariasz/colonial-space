import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {StarSolarGeneratorService} from './star-solar-generator/star-solar-generator.service';
import {StarState} from '../../../game-logic/store/territory/star/star.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

@Injectable()
export class StarGeneratorService {
    @Inject(StarSolarGeneratorService) private starSolarGeneratorService: StarSolarGeneratorService;

    private static readonly StarsSolar = 1;

    public generate(): TerritoryState<StarState>[] {
        const stars: TerritoryState<StarState>[] = [];

        for (let i = 0; i < StarGeneratorService.StarsSolar; i++) {
            stars.push(this.starSolarGeneratorService.generate());
        }

        return stars;
    }
}
