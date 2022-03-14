import 'reflect-metadata';
import {AddTourEffectOptions} from './add-tour-effect-options';
import {TOUR_EFFECT_METADATA_KEY} from './has-tour-effects';

export function AddTourEffect(options: AddTourEffectOptions): (object: any, methodName: string) => void {
    return function (object: any, methodName: string): void {
        Reflect.defineMetadata(TOUR_EFFECT_METADATA_KEY + options.name, {
            ...options,
            effect: object[methodName]
        }, object);
    };
}
