import {SatelliteMoonGenerator} from './sattelite-moon-generator/satellite-moon.generator';
import {SatelliteState} from '../../../store/territory/satellite/satellite.state';
import {TerritoryState} from '../../../store/territory/territory.state';

export class SatelliteGenerator {
    private static readonly SatellitesMoon = 3;

    public static generate(): TerritoryState<SatelliteState>[] {
        const satellites: TerritoryState<SatelliteState>[] = [];

        for (let i = 0; i < SatelliteGenerator.SatellitesMoon; i++) {
            satellites.push(SatelliteMoonGenerator.generate());
        }

        return satellites;
    }
}
