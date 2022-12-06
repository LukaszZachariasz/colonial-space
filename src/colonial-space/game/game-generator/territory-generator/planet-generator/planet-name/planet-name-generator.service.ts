import {Injectable} from '@colonial-space/core/injector/injectable';
import {PlanetNameConst} from './planet-name.const';

@Injectable()
export class PlanetNameGeneratorService {
    public static readonly PlanetNames = PlanetNameConst;
    public static readonly PlanetNamesLength = PlanetNameGeneratorService.PlanetNames.length;

    public generate(): string {
        return PlanetNameGeneratorService.PlanetNames[Math.floor(BABYLON.Scalar.RandomRange(0, PlanetNameGeneratorService.PlanetNamesLength))];
    }
}
