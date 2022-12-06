import {BuildingObjectType} from './building-object-type';

export interface BuildingObjectState {
    id: string;
    type: BuildingObjectType;
    artUrl: string;
    name: string;
    productionLeft: number;
    production: number;
    isBuilt: boolean;
}
