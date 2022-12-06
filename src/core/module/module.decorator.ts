import {Injector} from '@colonial-space/core/injector/injector';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ModuleOption} from './module-option';
import {ModuleSceneOption} from '@colonial-space/core/module/module-scene-option';
import {SceneRegister} from '@colonial-space/core/module/scene/scene-register';
import {Token} from '@colonial-space/core/injector/token';
import {Type} from '@colonial-space/core/type';

export function Module(options: ModuleOption): (constructor: Type<unknown>) => Type<unknown> {
    return function (constructor: Type<unknown>): Type<unknown> {
        registerProviders(options.providers);
        setTimeout(() => {
            registerScenes(options.scenes);
        });

        return constructor;
    };
}

function registerProviders(providers: Type<unknown>[]): void {
    providers?.forEach((provider: Type<unknown>) => {
        const instance = new provider();
        Injector.set(new Token(provider.name), instance);

        setTimeout(() => Lifecycle.onInit(instance));
    });
}

function registerScenes(scenes: ModuleSceneOption[]): void {
    scenes?.forEach((scene: ModuleSceneOption) => Injector.inject(SceneRegister).register(scene));
}
