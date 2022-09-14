import {BuildingObjectState} from './building-object/building-object.state';

export interface BuildingScopeState {
    name: string;
    objects: BuildingObjectState[];
}