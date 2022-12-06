import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SatelliteMoonGeneratorService} from './satellite-moon-generator/satellite-moon-generator.service';
import {SatelliteState} from '../../../game-logic/store/territory/satellite/satellite.state';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';

@Injectable()
export class SatelliteGeneratorService {
    @Inject(SatelliteMoonGeneratorService) private satelliteMoonGeneratorService: SatelliteMoonGeneratorService;

    private static readonly SatellitesMoon = 3;

    public generate(): TerritoryState<SatelliteState>[] {
        const satellites: TerritoryState<SatelliteState>[] = [];

        for (let i = 0; i < SatelliteGeneratorService.SatellitesMoon; i++) {
            satellites.push(this.satelliteMoonGeneratorService.generate());
        }

        return satellites;
    }
}
