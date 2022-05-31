import 'reflect-metadata';
import {TourEffect} from './tour-effect';
import {logic} from '../../../../game';

export const TOUR_EFFECT_METADATA_KEY = 'TourState Effect: ';

export function HasTourEffects(): (constructor: any) => any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args);

            setTimeout(() => {
                let metadataKeys = Reflect.getMetadataKeys(instance);
                metadataKeys = metadataKeys.filter((key: string) => key.includes(TOUR_EFFECT_METADATA_KEY));
                metadataKeys.forEach((key: string) => {
                    const metadataValue = Reflect.getMetadata(key, instance);

                    logic().tourService.addTourEffect(
                        new TourEffect(
                            metadataValue.priority,
                            instance[metadataValue.fromTourFieldName],
                            instance[metadataValue.toTourFieldName],
                            metadataValue.effect.bind(instance)
                        )
                    );
                });
            }, 0);

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}
