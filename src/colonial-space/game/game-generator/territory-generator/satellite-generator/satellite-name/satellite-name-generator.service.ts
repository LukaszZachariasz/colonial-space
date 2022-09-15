import {Injectable} from '@colonial-space/core/injector/injectable';
import {SatelliteNameConst} from './satellite-name.const';

@Injectable()
export class SatelliteNameGeneratorService {
    public static readonly SatelliteNames = SatelliteNameConst;
    public static readonly SatelliteNamesLength = SatelliteNameGeneratorService.SatelliteNames.length;

    public generate(): string {
        return SatelliteNameGeneratorService.SatelliteNames[Math.floor(BABYLON.Scalar.RandomRange(0, SatelliteNameGeneratorService.SatelliteNamesLength))];
    }
}
