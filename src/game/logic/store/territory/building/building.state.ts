import {BuildingScopeState} from './building-scope.state';

export interface BuildingState {
    [key: string]: BuildingScopeState;
}