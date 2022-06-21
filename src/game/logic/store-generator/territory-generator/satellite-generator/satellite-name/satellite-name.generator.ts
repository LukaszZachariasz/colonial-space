import {SatelliteNameConst} from './satellite-name.const';

export class SatelliteNameGenerator {
    public static readonly SatelliteNames = SatelliteNameConst;
    public static readonly SatelliteNamesLength = SatelliteNameGenerator.SatelliteNames.length;

    public static generate(): string {
        return SatelliteNameGenerator.SatelliteNames[Math.floor(BABYLON.Scalar.RandomRange(0, SatelliteNameGenerator.SatelliteNamesLength))];
    }
}
