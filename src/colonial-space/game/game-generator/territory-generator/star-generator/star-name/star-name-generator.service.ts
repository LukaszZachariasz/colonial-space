import {Injectable} from '@colonial-space/core/injector/injectable';
import {StarNameConst} from './star-name.const';

@Injectable()
export class StarNameGeneratorService {
    public static readonly StarNames = StarNameConst;
    public static readonly StarNamesLength = StarNameGeneratorService.StarNames.length;

    public generate(): string {
        return StarNameGeneratorService.StarNames[Math.floor(BABYLON.Scalar.RandomRange(0, StarNameGeneratorService.StarNamesLength))];
    }
}
