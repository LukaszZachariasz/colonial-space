import * as BABYLON from 'babylonjs';
import {ArrangementDefinition} from '@colonial-space/core/module/scene/definitions/arrangement-definition';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {GuiDefinition} from '@colonial-space/core/module/scene/definitions/gui-definition';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ProviderDefinition} from '@colonial-space/core/module/scene/definitions/provider-definition';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {SceneDefinition} from '@colonial-space/core/module/scene/definitions/scene-definition';
import {SceneOption} from '@colonial-space/core/module/scene/scene-option';
import {Subject} from 'rxjs';
import {Token} from '@colonial-space/core/injector/types/token';
import {ipcRenderer} from 'electron';

@Injectable({
    providedIn: 'root'
})
export class SceneManager {
    @Inject(ENGINE) private engine: BABYLON.Engine;

    public allScenes: RegisteredScene[] = [];
    public rootSceneAdded$: Subject<string> = new Subject<string>();

    public register(sceneOption: SceneOption): void {
        const sceneDefinition = new sceneOption.scene();
        const arrangementDefinitions = sceneOption.arrangement?.map((arrangement: ArrangementDefinition) => new arrangement());
        const providerDefinitions = sceneOption.providers?.map((provider: ProviderDefinition) => new provider());

        const babylonScene = new BABYLON.Scene(this.engine);
        const camera = sceneOption.cameraFactory(babylonScene);

        sceneDefinition['_sceneUid'] = babylonScene.uid;
        arrangementDefinitions?.forEach((arrangement: ArrangementDefinition) => arrangement['_sceneUid'] = babylonScene.uid);
        providerDefinitions?.forEach((provider: ProviderDefinition) => provider['_sceneUid'] = babylonScene.uid);
        Injector.set(new Token(`${babylonScene.uid}.SCENE`, true), babylonScene);
        Injector.set(new Token(`${babylonScene.uid}.CAMERA`, true), camera);
        providerDefinitions?.forEach((provider: ProviderDefinition) => Injector.set(new Token(`${babylonScene.uid}.${provider.constructor.name}`, true), provider));

        if (!sceneOption.lazy) {
            this.runLifecycle(sceneDefinition, arrangementDefinitions, providerDefinitions);
        }

        this.allScenes.push({
            name: sceneOption.name,
            scene: babylonScene,
            camera: camera,
            sceneDefinition: sceneDefinition,
            guiDefinition: sceneOption.gui,
            arrangementDefinitions: arrangementDefinitions,
            providerDefinitions: providerDefinitions,
            initialized: !sceneOption.lazy
        });

        if (!sceneOption.lazy) {
            this.load(sceneOption.name).then(() => {
                if (sceneOption.root) {
                    this.rootSceneAdded$.next(sceneOption.name);
                    ipcRenderer.send('game-root-scene-ready');
                }
            });
        }
    }

    public getScene(name: string): RegisteredScene {
        return this.allScenes.find((el: RegisteredScene) => el.name === name);
    }

    public async load(name: string): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            const scene = this.getScene(name);
            scene.scene.onReadyObservable.add(() => {
                resolve();
            });

            if (!scene.initialized) {
                this.runLifecycle(scene.sceneDefinition, scene.arrangementDefinitions, scene.providerDefinitions);
                scene.initialized = true;
            }

            setTimeout(() => {
                scene.scene.render();
            });
        });
    }

    private runLifecycle(sceneDefinition: SceneDefinition, arrangementDefinitions: ArrangementDefinition[], providerDefinitions: ProviderDefinition[]): void {
        Lifecycle.onInit(sceneDefinition);
        arrangementDefinitions?.forEach((arrangement: ArrangementDefinition) => Lifecycle.onInit(arrangement));
        providerDefinitions?.forEach((provider: ProviderDefinition) => Lifecycle.onInit(provider));
    }
}
