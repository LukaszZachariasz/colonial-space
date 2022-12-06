import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';

export function isOnLoad(object: any): object is OnLoad {
    return 'gameOnLoad' in object;
}
