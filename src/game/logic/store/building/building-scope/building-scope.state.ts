import {BuildingScopeSectorState} from './building-sector/building-scope-sector.state';

export interface BuildingScopeState {
    id: string;
    label: string;
    currentBuildingObjectId: string | null;
    sectors: BuildingScopeSectorState[];
}