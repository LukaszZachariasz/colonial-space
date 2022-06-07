import {PlanetState} from '../../../store/territory/planet/planet.state';

export class PlanetProductionService {
    public static readonly SUNLIGHT_MIN_PRODUCTION = 50;
    public static readonly SUNLIGHT_INCREASE_RATIO = 1.5;

    public static readonly WATER_MIN_PRODUCTION = 20;
    public static readonly WATER_INCREASE_RATIO = 1.7;

    public getTotalProduction(planetState: PlanetState): number {
        const sunlightProduction = this.getSunlightProduction(planetState.sunlight);
        const waterProduction = this.getWaterProduction(planetState.water);

        return sunlightProduction + waterProduction;
    }

    public getSunlightProduction(sunlight: number): number {
        return this.calculateProduction(sunlight, PlanetProductionService.SUNLIGHT_INCREASE_RATIO, PlanetProductionService.SUNLIGHT_MIN_PRODUCTION);
    }

    public getWaterProduction(water: number): number {
        return this.calculateProduction(water, PlanetProductionService.WATER_INCREASE_RATIO, PlanetProductionService.WATER_MIN_PRODUCTION);
    }

    public calculateProduction(x: number, increaseRatio: number, min: number): number {
        return Math.floor((-(1/200) * Math.pow(x, 2)) + ((increaseRatio) * x) + min);
    }
}
