import {AsteroidGeneratorService} from './asteroid-generator/asteroid-generator.service';
import {BlackHoleGeneratorService} from './black-hole-generator/black-hole-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetGeneratorService} from './planet-generator/planet-generator.service';
import {SatelliteGeneratorService} from './satellite-generator/satellite-generator.service';
import {StarGeneratorService} from './star-generator/star-generator.service';
import {TerritoryState} from '../../game-logic/store/territory/territory.state';

@Injectable()
export class TerritoryGeneratorService {
    @Inject(PlanetGeneratorService) private planetGeneratorService: PlanetGeneratorService;
    @Inject(StarGeneratorService) private starGeneratorService: StarGeneratorService;
    @Inject(SatelliteGeneratorService) private satelliteGeneratorService: SatelliteGeneratorService;
    @Inject(AsteroidGeneratorService) private asteroidGeneratorService: AsteroidGeneratorService;
    @Inject(BlackHoleGeneratorService) private blackHoleGeneratorService: BlackHoleGeneratorService;

    public generate(): TerritoryState[] {
        return [
            ...this.planetGeneratorService.generate(),
            ...this.starGeneratorService.generate(),
            ...this.satelliteGeneratorService.generate(),
            ...this.asteroidGeneratorService.generate(),
            ...this.blackHoleGeneratorService.generate()
        ];
    }
}
