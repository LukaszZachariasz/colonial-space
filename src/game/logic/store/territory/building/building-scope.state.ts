import {BuildingScopeSectorState} from './building-scope-sector.state';

export interface BuildingScopeState {
    id: string;
    label: string;
    currentBuildingObjectId: string | null;
    sectors: BuildingScopeSectorState[];
}