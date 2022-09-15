import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetNameGeneratorService} from '../planet-name/planet-name-generator.service';
import {PlanetSandState} from '../../../../game-logic/store/territory/planet/planet-sand/planet-sand.state';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class PlanetSandGeneratorService {
    @Inject(PlanetNameGeneratorService) private planetNameGeneratorService: PlanetNameGeneratorService;
    
    public generate(): TerritoryState<PlanetSandState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_SAND,
            icon: GameIcon.PLANET,
            name: this.planetNameGeneratorService.generate(),
            artUrl: './resources/territory/planet/planet-sand/planet-art.png',
            data: {
                basicProduction: 0,
                isAnalysed: false,
                analysisTourLeft: Math.floor(BABYLON.Scalar.RandomRange(3, 6)),
                isColonized: false,
                buildingId: null,

                water: Math.floor(BABYLON.Scalar.RandomRange(10, 20)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(70, 90)),
                pollution: Math.floor(BABYLON.Scalar.RandomRange(5, 10))
            }
        };
    }
}
