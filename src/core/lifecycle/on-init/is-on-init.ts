import {OnInit} from './on-init';

export function isOnInit(object: any): object is OnInit {
    return 'gameOnInit' in object;
}
