import {OnReady} from './on-ready';

export function isOnReady(object: any): object is OnReady {
    return 'gameOnReady' in object;
}
