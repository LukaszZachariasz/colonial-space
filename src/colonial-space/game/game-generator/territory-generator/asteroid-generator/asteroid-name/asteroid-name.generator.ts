import {AsteroidNameConst} from './asteroid-name.const';

export class AsteroidNameGenerator {
    public static readonly AsteroidNames = AsteroidNameConst;
    public static readonly AsteroidNamesLength = AsteroidNameGenerator.AsteroidNames.length;

    public static generate(): string {
        return AsteroidNameGenerator.AsteroidNames[Math.floor(BABYLON.Scalar.RandomRange(0, AsteroidNameGenerator.AsteroidNamesLength))];
    }
}
