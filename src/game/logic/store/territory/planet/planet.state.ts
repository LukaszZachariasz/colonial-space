import {BuildingState} from '../building/building.state';

export interface PlanetState {
    water: number;
    sunlight: number;
    building: BuildingState;
}
