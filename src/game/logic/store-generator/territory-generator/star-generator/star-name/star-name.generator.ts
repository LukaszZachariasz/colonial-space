import {StarNameConst} from './star-name.const';

export class StarNameGenerator {
    public static readonly StarNames = StarNameConst;
    public static readonly StarNamesLength = StarNameGenerator.StarNames.length;

    public static generate(): string {
        return StarNameGenerator.StarNames[Math.floor(BABYLON.Scalar.RandomRange(0, StarNameGenerator.StarNamesLength))];
    }
}
