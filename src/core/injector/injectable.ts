import {InjectableOptions} from '@colonial-space/core/injector/injectable-options';
import {Injector} from '@colonial-space/core/injector/injector';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {Token} from '@colonial-space/core/injector/token';

export function Injectable(injectableOptions?: InjectableOptions): any {
    return function (constructor: any): any {
        if (injectableOptions?.providedIn === 'root') {
            const instance = new constructor();
            Injector.set(new Token(constructor.name), instance);

            setTimeout(() => {
                Lifecycle.onInit(instance);
            });    
        }
    };
}
