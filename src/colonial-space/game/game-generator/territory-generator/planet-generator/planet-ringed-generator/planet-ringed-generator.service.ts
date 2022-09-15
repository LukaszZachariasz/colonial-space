import {GameIcon} from '../../../../space-scene/gui/shared/icon/game-icon';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetNameGeneratorService} from '../planet-name/planet-name-generator.service';
import {PlanetRingedState} from '../../../../game-logic/store/territory/planet/planet-ringed/planet-ringed.state';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {v4 as uuid} from 'uuid';

@Injectable()
export class PlanetRingedGeneratorService {
    @Inject(PlanetNameGeneratorService) private planetNameGeneratorService: PlanetNameGeneratorService;

    public generate(): TerritoryState<PlanetRingedState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_RINGED,
            icon: GameIcon.PLANET,
            name: this.planetNameGeneratorService.generate(),
            artUrl: './resources/territory/planet/planet-ringed/planet-art.png',
            data: {
                basicProduction: 0,
                isAnalysed: false,
                analysisTourLeft: Math.floor(BABYLON.Scalar.RandomRange(10, 15)),
                isColonized: false,
                buildingId: null,

                water: Math.floor(BABYLON.Scalar.RandomRange(20, 30)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(20, 30)),
                pollution: Math.floor(BABYLON.Scalar.RandomRange(60, 80))
            }
        };
    }
}
