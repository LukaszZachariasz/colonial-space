import 'reflect-metadata';
import {TOUR_BLOCKER_METADATA_KEY} from './has-tour-blockers';

export function AddTourBlocker(name: string): (object: any, methodName: string) => void {
    return function (object: any, methodName: string): void {
        Reflect.defineMetadata(TOUR_BLOCKER_METADATA_KEY + name, {
            blocker: object[methodName]
        }, object);
    };
}
