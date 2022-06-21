import {BlackHoleGenerator} from './black-hole-generator/black-hole.generator';
import {PlanetGenerator} from './planet-generator/planet.generator';
import {SatelliteGenerator} from './satellite-generator/satellite.generator';
import {StarGenerator} from './star-generator/star.generator';
import {TerritoryState} from '../../store/territory/territory.state';

export class TerritoryGenerator {
    public static generate(): TerritoryState[] {
        return [
            ...PlanetGenerator.generate(),
            ...StarGenerator.generate(),
            ...SatelliteGenerator.generate(),
            ...BlackHoleGenerator.generate()
        ];
    }
}
