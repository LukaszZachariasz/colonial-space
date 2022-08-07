import {WithBuilding} from '../../building/with-building';

export interface PlanetState extends WithBuilding {
    isAnalysed: boolean;
    analysisTourLeft: number;
    isColonized: boolean;
    basicProduction: number;

    water: number;
    sunlight: number;
    pollution: number;
}
