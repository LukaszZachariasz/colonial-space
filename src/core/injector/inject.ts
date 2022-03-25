import 'reflect-metadata';
import {AfterInjection} from '../life-cycle/after-injection';
import {Injector} from './injector';
import {ResolveInjections} from './resolve-injections';
import {filter, take, tap} from 'rxjs';

const INJECT_METADATA_KEY = 'Inject';

export function Inject(Class: any): any {
    return function (target: Object, propertyKey: string) {
        let currentInjections = Reflect.getMetadata(INJECT_METADATA_KEY, target);
        if (currentInjections === undefined) {
            Reflect.defineMetadata(INJECT_METADATA_KEY, [], target);
            currentInjections = [];
        }
        Reflect.defineMetadata(INJECT_METADATA_KEY, [...currentInjections, Class.name], target);

        ResolveInjections.resolve$.pipe(
            filter((resolve: boolean) => resolve),
            take(1),
            tap(() => {
                Object.defineProperty(target, propertyKey, {
                    get(): any {
                        return Injector.get(Class);
                    }
                });
            }),
            tap(() => {
                currentInjections = Reflect.getMetadata(INJECT_METADATA_KEY, target);
                Reflect.defineMetadata(INJECT_METADATA_KEY, currentInjections.filter((className: string) => className !== Class.name), target);
            }),
            tap(() => {
                if (Reflect.getMetadata(INJECT_METADATA_KEY, target).length === 0) {
                    target.hasOwnProperty('afterInjection') && (target as AfterInjection).afterInjection();
                }
            })
        ).subscribe();
    };
}
