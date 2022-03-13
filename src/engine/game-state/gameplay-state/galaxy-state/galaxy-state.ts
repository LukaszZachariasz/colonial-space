import {GalaxyAreaState} from './galaxy-area-state/galaxy-area-state';
import {GalaxyOriginState} from './galaxy-origin-state/galaxy-origin-state';

export class GalaxyState {
    public name: string;
    public galaxyOriginState: GalaxyOriginState;

    public galaxyAreaStates: GalaxyAreaState[] = [];
}