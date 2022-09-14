import {Injector} from '@colonial-space/core/injector/injector';
import {ModuleOptions} from './module-options';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {SceneOption} from '@colonial-space/core/module/scene/scene-option';

export function Module(options: ModuleOptions): any {
    return function (constructor: any): any {
        setTimeout(() => {
            registerScenes(options.scenes);
        });

        return constructor;
    };
}

function registerScenes(scenes: SceneOption[]): void {
    scenes?.forEach((scene: SceneOption) => Injector.inject(SceneManager).register(scene));
}
