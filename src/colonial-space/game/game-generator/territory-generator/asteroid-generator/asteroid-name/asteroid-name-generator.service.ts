import {AsteroidNameConst} from './asteroid-name.const';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class AsteroidNameGeneratorService {
    public static readonly AsteroidNames = AsteroidNameConst;
    public static readonly AsteroidNamesLength = AsteroidNameGeneratorService.AsteroidNames.length;

    public generate(): string {
        return AsteroidNameGeneratorService.AsteroidNames[Math.floor(BABYLON.Scalar.RandomRange(0, AsteroidNameGeneratorService.AsteroidNamesLength))];
    }
}
