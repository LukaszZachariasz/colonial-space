import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {PlanetRingedState} from '../../../../store/territory/planet/planet-ringed/planet-ringed.state';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetRingedGenerator {
    public static generate(): TerritoryState<PlanetRingedState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_RINGED,
            name: PlanetNameGenerator.generate(),
            artUrl: './resources/territory/planet/planet-ringed/planet-art.png',
            data: {
                basicProduction: 0,
                water: Math.floor(BABYLON.Scalar.RandomRange(20,30)),
                sunlight: Math.floor(BABYLON.Scalar.RandomRange(20,30)),
                buildingId: null
            }
        };
    }
}