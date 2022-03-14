import 'reflect-metadata';
import {TourEffect} from './tour-effect';
import {gameState} from '../../../core/game-platform';

export const TOUR_EFFECT_METADATA_KEY = 'Tour Effect: ';

export function HasTourEffects(): any {
    return function (constructor: any): any {
        const original = constructor;

        const f: any = function (...args: any[]) {
            const instance = new original(...args);

            let metadataKeys = Reflect.getMetadataKeys(instance);
            metadataKeys = metadataKeys.filter((key: string) => key.includes(TOUR_EFFECT_METADATA_KEY));
            metadataKeys.forEach((key: string) => {
                const metadataValue = Reflect.getMetadata(key, instance);

                gameState().tourManager.addTourEffect(
                    new TourEffect(
                        metadataValue.priority,
                        instance[metadataValue.fromTourFieldName],
                        instance[metadataValue.toTourFieldName],
                        metadataValue.effect.bind(instance)
                    )
                );
            });

            return instance;
        };

        f.prototype = original.prototype;
        return f;
    };
}
