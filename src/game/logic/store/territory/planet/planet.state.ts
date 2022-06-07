import {WithBuilding} from '../../building/with-building';

export interface PlanetState extends WithBuilding {
    basicProduction: number;
    water: number;
    sunlight: number;
}
