import {Instance} from '@colonial-space/core/injector/instance';
import {Token} from '@colonial-space/core/injector/token';

export interface Injection {
    token: Token;
    instance: Instance;
}
