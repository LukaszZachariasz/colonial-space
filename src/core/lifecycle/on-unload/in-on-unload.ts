import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';

export function isOnUnload(object: any): object is OnUnload {
    return 'gameOnUnload' in object;
}
