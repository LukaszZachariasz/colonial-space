import {BuildingObjectState} from './building-object.state';

export interface BuildingScopeSectorState {
    name: string;
    objects: BuildingObjectState[];
}