import 'reflect-metadata';
import {TourEffect} from './tour-effect';
import {logic} from '../../../../game';

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
                    tourEffects.push(tourEffect);

                    logic().tourService.addTourEffect(tourEffect);
                });

                instance.clearTourEffects = (): void => {
                    tourEffects.forEach((effect: TourEffect) => {
                        logic().tourService.removeTourEffect(effect);
                    });
                };
            }, 0);

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}
