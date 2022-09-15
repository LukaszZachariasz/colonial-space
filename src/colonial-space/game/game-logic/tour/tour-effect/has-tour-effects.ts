import 'reflect-metadata';
import {Injector} from '@colonial-space/core/injector/injector';
import {TourEffect} from './tour-effect';
import {TourService} from '../tour.service';

export const TOUR_EFFECT_METADATA_KEY = 'TourState Effect: ';

export function HasTourEffects(): (constructor: any) => any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args);
            const tourEffects: TourEffect[] = [];

            setTimeout(() => {
                let metadataKeys = Reflect.getMetadataKeys(instance);
                metadataKeys = metadataKeys.filter((key: string) => key.includes(TOUR_EFFECT_METADATA_KEY));
                metadataKeys.forEach((key: string) => {
                    const metadataValue = Reflect.getMetadata(key, instance);

                    const tourEffect = new TourEffect(
                        metadataValue.priority,
                        instance[metadataValue.fromTourFieldName],
                        instance[metadataValue.toTourFieldName],
                        metadataValue.effect.bind(instance)
                    );
                    debugger;
                    tourEffects.push(tourEffect);

                    Injector.inject(TourService).addTourEffect(tourEffect);
                });

                instance.clearTourEffects = (): void => {
                    tourEffects.forEach((effect: TourEffect) => {
                        Injector.inject(TourService).removeTourEffect(effect);
                    });
                };
            }, 0);

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        Object.defineProperty(overrideConstructor, 'name', {
            get(): any {
                return original.name;
            }
        });
        return overrideConstructor;
    };
}
