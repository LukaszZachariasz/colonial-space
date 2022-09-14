import {Instance} from '@colonial-space/core/injector/types/instance';
import {Token} from '@colonial-space/core/injector/types/token';

export interface Injection {
    token: Token;
    instance: Instance;
}
