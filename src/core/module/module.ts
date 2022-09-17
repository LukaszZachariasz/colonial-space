import {Injector} from '@colonial-space/core/injector/injector';
import {ModuleOptions} from './module-options';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {SceneOption} from '@colonial-space/core/module/scene/scene-option';
import {Token} from '@colonial-space/core/injector/types/token';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';

export function Module(options: ModuleOptions): any {
    return function (constructor: any): any {
        registerProviders(options.providers);
        setTimeout(() => {
            registerScenes(options.scenes);
        });

        return constructor;
    };
}

function registerProviders(providers: any[]): void {
    providers?.forEach((provider: any) => {
        const instance = new provider();
        Injector.set(new Token(provider.name), instance);

        setTimeout(() => {
            if (isOnInit(instance)) {
                instance.gameOnInit();
            }
        });
    });
}

function registerScenes(scenes: SceneOption[]): void {
    scenes?.forEach((scene: SceneOption) => Injector.inject(SceneManager).register(scene));
}
