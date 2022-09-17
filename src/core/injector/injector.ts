import {Injection} from '@colonial-space/core/injector/types/injection';
import {Instance} from '@colonial-space/core/injector/types/instance';
import {Token} from '@colonial-space/core/injector/types/token';
import {Type} from '@colonial-space/core/type';

export class Injector {
    public static injections: Injection[] = [];

    public static inject<T>(injection: string | Token | Type<T>): T {
        if (typeof injection === 'string') {
            return this.injections.find((el: Injection) => el.token.injectionToken === injection)?.instance;
        }
        if (injection instanceof Token) {
            return this.injections.find((el: Injection) => el.token.injectionToken === injection.injectionToken)?.instance;
        }
        return this.injections.find((el: Injection) => el.token.injectionToken === (injection as any).name)?.instance;
    }

    public static set(token: Token, instance: Instance): void {
        this.injections.push({token: token, instance: instance});
    }
}
