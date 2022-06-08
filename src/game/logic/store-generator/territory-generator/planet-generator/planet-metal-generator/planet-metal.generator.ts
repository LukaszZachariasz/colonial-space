import {PlanetNameGenerator} from '../planet-name/planet-name.generator';
import {PlanetRingedState} from '../../../../store/territory/planet/planet-ringed/planet-ringed.state';
import {TerritoryState} from '../../../../store/territory/territory.state';
import {TerritoryType} from '../../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetMetalGenerator {
    public static generate(): TerritoryState<PlanetRingedState> {
        return {
            id: uuid(),
            type: TerritoryType.PLANET_METAL,
            name: PlanetNameGenerator.generate(),
            artUrl: './resources/territory/planet/planet-metal/planet-art.png',
            data: {
                basicProduction: 0,
                water: 0,
                sunlight: 10,
                buildingId: null
            }
        };
    }
}