import {Injector} from '@colonial-space/core/injector/injector';
import {Instance} from '@colonial-space/core/injector/types/instance';
import {Token} from '@colonial-space/core/injector/types/token';

export function Inject(token: Token | Instance): any {
    return function (object: any, propertyKey: string) {
        const getter = function (): any {
            return Injector.inject(this['_sceneUid'] + '.' + token.injectionToken) ||
                Injector.inject(this['_sceneUid'] + '.' + token.name) ||
                Injector.inject(token);
        };

        Object.defineProperty(object, propertyKey, {
            get: getter
        });
    };
}
