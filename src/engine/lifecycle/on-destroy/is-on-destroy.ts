import {OnDestroy} from './on-destroy';

export function isOnDestroy(object: any): object is OnDestroy {
    return 'gameOnDestroy' in object;
}
