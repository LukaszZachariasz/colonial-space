import 'reflect-metadata';
import {TourBlocker} from './tour-blocker';
import {logic} from '../../../../game';

export const TOUR_BLOCKER_METADATA_KEY = 'TourState Blocker: ';

export function HasTourBlockers(): (constructor: any) => any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args);

            setTimeout(() => {
                let metadataKeys = Reflect.getMetadataKeys(instance);
                metadataKeys = metadataKeys.filter((key: string) => key.includes(TOUR_BLOCKER_METADATA_KEY));
                metadataKeys.forEach((key: string) => {
                    const metadataValue = Reflect.getMetadata(key, instance);

                    logic().tourService.addTourBlocker(new TourBlocker(metadataValue.blocker.bind(instance)));
                });
            }, 0);

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}
