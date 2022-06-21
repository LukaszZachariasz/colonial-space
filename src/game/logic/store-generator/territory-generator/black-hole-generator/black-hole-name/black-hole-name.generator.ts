import {BlackHoleNameConst} from './black-hole-name.const';

export class BlackHoleNameGenerator {
    public static readonly BlackHoleNames = BlackHoleNameConst;
    public static readonly BlackHoleNamesLength = BlackHoleNameGenerator.BlackHoleNames.length;

    public static generate(): string {
        return BlackHoleNameGenerator.BlackHoleNames[Math.floor(BABYLON.Scalar.RandomRange(0, BlackHoleNameGenerator.BlackHoleNamesLength))];
    }
}
