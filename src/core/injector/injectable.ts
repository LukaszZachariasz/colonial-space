import {Injector} from '@colonial-space/core/injector/injector';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';

export function Injectable(): any {
    return function (constructor: any): any {
        const instance = new constructor();
        Injector.set(constructor.name, instance);

        setTimeout(() => {
            if (isOnInit(instance)) {
                instance.gameOnInit();
            }
        });
    };
}
