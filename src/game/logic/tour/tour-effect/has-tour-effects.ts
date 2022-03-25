import 'reflect-metadata';
import {Injector} from '../../../../core/injector/injector';
import {ResolveInjections} from '../../../../core/injector/resolve-injections';
import {TourEffect} from './tour-effect';
import {TourService} from '../tour.service';
import {filter, take, tap} from 'rxjs';

export const TOUR_EFFECT_METADATA_KEY = 'TourState Effect: ';

export function HasTourEffects(): (constructor: any) => any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args);

            let metadataKeys = Reflect.getMetadataKeys(instance);
            metadataKeys = metadataKeys.filter((key: string) => key.includes(TOUR_EFFECT_METADATA_KEY));
            metadataKeys.forEach((key: string) => {
                const metadataValue = Reflect.getMetadata(key, instance);

                ResolveInjections.resolve$.pipe(
                    filter((resolved: boolean) => resolved),
                    take(1),
                    tap(() => {
                        Injector.get(TourService).addTourEffect(
                            new TourEffect(
                                metadataValue.priority,
                                instance[metadataValue.fromTourFieldName],
                                instance[metadataValue.toTourFieldName],
                                metadataValue.effect.bind(instance)
                            )
                        );
                    })
                ).subscribe();
            });

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}
