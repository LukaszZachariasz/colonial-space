import {OnReady} from './on-ready';

// depreciated
export function isOnReady(object: any): object is OnReady {
    return 'gameOnReady' in object;
}
