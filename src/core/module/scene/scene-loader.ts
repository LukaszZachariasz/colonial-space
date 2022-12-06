import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {RegisteredScene} from '@colonial-space/core/module/scene/registered-scene';
import {SceneManager} from '@colonial-space/core/module/scene/scene-manager';
import {SceneObject} from '@colonial-space/core/module/scene/scene-object';

@Injectable({
    providedIn: 'root'
})
export class SceneLoader {
    @Inject(SceneManager) private sceneManager: SceneManager;

    public async load(name: string): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            const registeredScene = this.sceneManager.getScene(name);
            registeredScene.scene.onReadyObservable.add(() => {
                resolve();
            });

            if (!registeredScene.initialized) {
                this.initializeSceneLifecycle(registeredScene);
                registeredScene.initialized = true;
            }

            setTimeout(() => {
                registeredScene.scene.render();
            });
        });
    }

    public initializeSceneLifecycle(registeredScene: RegisteredScene): void {
        Lifecycle.onInit(registeredScene.sceneDefinition);
        registeredScene.arrangementDefinitions?.forEach((arrangement: SceneObject) => Lifecycle.onInit(arrangement));
        registeredScene.providerDefinitions?.forEach((provider: SceneObject) => Lifecycle.onInit(provider));
    }
}
