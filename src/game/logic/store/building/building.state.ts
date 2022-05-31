import {BuildingScopeState} from './building-scope/building-scope.state';

export interface BuildingState {
    id: string;
    scopes: BuildingScopeState[];
}
