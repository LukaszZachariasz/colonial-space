import {BuildingObjectState} from './building-object/building-object.state';

export interface BuildingScopeSectorState {
    name: string;
    objects: BuildingObjectState[];
}