import {Injector} from '@colonial-space/core/injector/injector';
import {Token} from '@colonial-space/core/injector/types/token';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';

export function Injectable(token?: Token): any {
    return function (constructor: any): any {
        const instance = new constructor();
        Injector.set(token || constructor.name, instance);

        setTimeout(() => {
            if (isOnInit(instance)) {
                instance.gameOnInit();
            }
        });
    };
}
