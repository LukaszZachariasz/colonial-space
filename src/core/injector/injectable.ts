import {Injector} from '@colonial-space/core/injector/injector';
import {isOnReady} from '@colonial-space/core/lifecycle/on-ready/is-on-ready';

export function Injectable(): any {
    return function (constructor: any): any {
        const instance = new constructor();
        Injector.set(constructor.name, instance);

        setTimeout(() => {
            if (isOnReady(instance)) {
                instance.gameOnReady();
            }
        });
    };
}
