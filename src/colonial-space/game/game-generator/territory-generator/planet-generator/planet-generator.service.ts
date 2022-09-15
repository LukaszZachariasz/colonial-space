import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetGreenGeneratorService} from './planet-green-generator/planet-green-generator.service';
import {PlanetMetalGeneratorService} from './planet-metal-generator/planet-metal-generator.service';
import {PlanetRingedGeneratorService} from './planet-ringed-generator/planet-ringed-generator.service';
import {PlanetSandGeneratorService} from './planet-sand-generator/planet-sand-generator.service';
import {PlanetState} from '../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

@Injectable()
export class PlanetGeneratorService {
    @Inject(PlanetGreenGeneratorService) private planetGreenGeneratorService: PlanetGreenGeneratorService;
    @Inject(PlanetSandGeneratorService) private planetSandGeneratorService: PlanetSandGeneratorService;
    @Inject(PlanetMetalGeneratorService) private planetMetalGeneratorService: PlanetMetalGeneratorService;
    @Inject(PlanetRingedGeneratorService) private planetRingedGeneratorService: PlanetRingedGeneratorService;

    private static readonly PlanetsGreen = 5;
    private static readonly PlanetsSand = 3;
    private static readonly PlanetsMetal = 1;
    private static readonly PlanetsRinged = 2;

    public generate(): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];

        for (let i = 0; i < PlanetGeneratorService.PlanetsGreen; i++) {
            planets.push(this.planetGreenGeneratorService.generate());
        }

        for (let i = 0; i < PlanetGeneratorService.PlanetsSand; i++) {
            planets.push(this.planetSandGeneratorService.generate());
        }

        for (let i = 0; i < PlanetGeneratorService.PlanetsMetal; i++) {
            planets.push(this.planetMetalGeneratorService.generate());
        }

        for (let i = 0; i < PlanetGeneratorService.PlanetsRinged; i++) {
            planets.push(this.planetRingedGeneratorService.generate());
        }

        return planets;
    }
}
