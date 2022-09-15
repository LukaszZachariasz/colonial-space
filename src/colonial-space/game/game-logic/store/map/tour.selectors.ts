import {MapState} from './map.state';
import {store} from '../store';

export const selectMap = (): MapState => store.getState().map;
export const selectMapSkybox = (): string => selectMap().skyboxType;
