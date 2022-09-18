import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {ModuleSceneOption} from '@colonial-space/core/module/module-scene-option';
import {RegisteredScene} from '@colonial-space/core/module/scene/registered-scene';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneLoader} from '@colonial-space/core/module/scene/scene-loader';
import {SceneManager} from '@colonial-space/core/module/scene/scene-manager';
import {SceneObject} from '@colonial-space/core/module/scene/scene-object';
import {Subject} from 'rxjs';
import {Token} from '@colonial-space/core/injector/types/token';
import {Type} from '@colonial-space/core/type';
import {ipcRenderer} from 'electron';

@Injectable({
    providedIn: 'root'
})
export class SceneRegister {
    @Inject(ENGINE) private engine: BABYLON.Engine;
    @Inject(SceneManager) private sceneManager: SceneManager;
    @Inject(SceneLoader) private sceneLoader: SceneLoader;

    public rootSceneAdded$: Subject<string> = new Subject<string>();

    public register(moduleSceneOption: ModuleSceneOption): void {
        const registeredScene: RegisteredScene = new RegisteredScene();
        this.createSceneObjects(registeredScene, moduleSceneOption);
        this.assignSceneUuid(registeredScene);
        this.createSceneProviders(registeredScene);

        if (!moduleSceneOption.lazy) {
            this.sceneLoader.initializeSceneLifecycle(registeredScene);
        }

        this.sceneManager.addScene(registeredScene);

        if (!moduleSceneOption.lazy) {
            this.sceneLoader.load(moduleSceneOption.name).then(() => {
                if (moduleSceneOption.root) {
                    this.rootSceneAdded$.next(moduleSceneOption.name);
                    ipcRenderer.send('game-root-scene-ready');
                }
            });
        }
    }

    private createSceneObjects(registeredScene: RegisteredScene, moduleSceneOption: ModuleSceneOption): void {
        registeredScene.sceneDefinition = new moduleSceneOption.scene() as SceneObject;
        registeredScene.arrangementDefinitions = moduleSceneOption.arrangement?.map((arrangement: Type<SceneObject>) => new arrangement());
        registeredScene.providerDefinitions = moduleSceneOption.providers?.map((provider: Type<SceneObject>) => new provider());
        registeredScene.scene = new BABYLON.Scene(this.engine);
        registeredScene.camera = moduleSceneOption.cameraFactory(registeredScene.scene);
        registeredScene.modelManager = new ModelManager();
        registeredScene.initialized = !moduleSceneOption.lazy;
        registeredScene.name = moduleSceneOption.name;
        registeredScene.gui = moduleSceneOption.gui;
    }

    private assignSceneUuid(registeredScene: RegisteredScene): void {
        registeredScene.sceneDefinition._sceneUid = registeredScene.scene.uid;
        registeredScene.arrangementDefinitions?.forEach((arrangement: SceneObject) => arrangement._sceneUid = registeredScene.scene.uid);
        registeredScene.providerDefinitions?.forEach((provider: SceneObject) => provider._sceneUid = registeredScene.scene.uid);
        (registeredScene.modelManager as any)._sceneUid = registeredScene.scene.uid;
    }

    private createSceneProviders(registeredScene: RegisteredScene): void {
        Injector.set(new Token(`${registeredScene.scene.uid}.${SCENE.injectionToken}`, true), registeredScene.scene);
        Injector.set(new Token(`${registeredScene.scene.uid}.${CAMERA.injectionToken}`, true), registeredScene.camera);
        Injector.set(new Token(`${registeredScene.scene.uid}.${(ModelManager as any).name}`, true), registeredScene.modelManager);
        registeredScene.providerDefinitions?.forEach((provider: SceneObject) => Injector.set(new Token(`${registeredScene.scene.uid}.${(provider.constructor as any).name}`, true), provider));
    }
}
