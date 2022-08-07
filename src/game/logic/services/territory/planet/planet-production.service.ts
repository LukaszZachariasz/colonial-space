import {PlanetState} from '../../../store/territory/planet/planet.state';

export class PlanetProductionService {
    public static readonly SUNLIGHT_MIN_PRODUCTION = 50;
    public static readonly SUNLIGHT_INCREASE_RATIO = 1.5;

    public static readonly WATER_MIN_PRODUCTION = 20;
    public static readonly WATER_INCREASE_RATIO = 1.7;

    public static readonly POLLUTION_MIN_PRODUCTION = 0;
    public static readonly POLLUTION_INCREASE_RATIO = 0.2;

    public getTotalProduction(planetState: PlanetState): number {
        const sunlightProduction = this.getSunlightProduction(planetState.sunlight);
        const waterProduction = this.getWaterProduction(planetState.water);
        const pollutionProduction = this.getPollutionProduction(planetState.pollution);

        return sunlightProduction + waterProduction + pollutionProduction;
    }

    public getSunlightProduction(sunlight: number): number {
        return this.calculateIncomeProduction(sunlight, PlanetProductionService.SUNLIGHT_INCREASE_RATIO, PlanetProductionService.SUNLIGHT_MIN_PRODUCTION);
    }

    public getWaterProduction(water: number): number {
        return this.calculateIncomeProduction(water, PlanetProductionService.WATER_INCREASE_RATIO, PlanetProductionService.WATER_MIN_PRODUCTION);
    }

    public getPollutionProduction(pollution: number): number {
        return this.calculateOutgoProduction(pollution, PlanetProductionService.POLLUTION_INCREASE_RATIO, PlanetProductionService.POLLUTION_MIN_PRODUCTION);
    }

    public calculateIncomeProduction(x: number, increaseRatio: number, min: number): number {
        return Math.floor((-(1/200) * Math.pow(x, 2)) + ((increaseRatio) * x) + min);
    }

    public calculateOutgoProduction(x: number, increaseRatio: number, min: number): number {
        return -Math.floor(((1/200) * Math.pow(x, 2)) + ((increaseRatio) * x) + min);
    }
}
