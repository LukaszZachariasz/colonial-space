import {BlackHoleNameConst} from './black-hole-name.const';
import {Injectable} from '@colonial-space/core/injector/injectable';

@Injectable()
export class BlackHoleNameGeneratorService {
    public static readonly BlackHoleNames = BlackHoleNameConst;
    public static readonly BlackHoleNamesLength = BlackHoleNameGeneratorService.BlackHoleNames.length;

    public generate(): string {
        return BlackHoleNameGeneratorService.BlackHoleNames[Math.floor(BABYLON.Scalar.RandomRange(0, BlackHoleNameGeneratorService.BlackHoleNamesLength))];
    }
}
