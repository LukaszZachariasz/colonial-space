import {GlobalResourceState} from './global-resource.state';
import {store} from '../store';

export const selectGlobalResource = (): GlobalResourceState => store.getState().globalResource;
export const selectScience = (): number => selectGlobalResource().science;
export const selectFuel = (): number => selectGlobalResource().fuel;
export const selectAwareness = (): number => selectGlobalResource().awareness;
