import {PlanetNameConst} from './planet-name.const';

export class PlanetNameGenerator {
    public static readonly PlanetNames = PlanetNameConst;
    public static readonly PlanetNamesLength = PlanetNameGenerator.PlanetNames.length;

    public static generate(): string {
        return PlanetNameGenerator.PlanetNames[Math.floor(BABYLON.Scalar.RandomRange(0, PlanetNameGenerator.PlanetNamesLength))];
    }
}
