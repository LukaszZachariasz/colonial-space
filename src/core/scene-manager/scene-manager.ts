import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneOption} from '@colonial-space/core/module/scene/scene-option';
import {Subject} from 'rxjs';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';

@Injectable()
export class SceneManager {
    public allScenes: RegisteredScene[] = [];
    public rootSceneAdded$: Subject<string> = new Subject<string>();
    
    public register(sceneOption: SceneOption): void {
        const sceneDefinition = new sceneOption.scene();
        const guiDefinition = new sceneOption.gui();
        const componentsDefinitions = sceneOption.components?.map((component: any) => new component());

        const babylonScene = new BABYLON.Scene(Injector.inject(ENGINE));
        const camera = sceneOption.cameraFactory(babylonScene);

        Injector.set(SCENE(sceneOption.name), babylonScene);
        Injector.set(CAMERA(sceneOption.name), camera);

        isOnInit(sceneDefinition) && sceneDefinition.gameOnInit();
        isOnInit(guiDefinition) && guiDefinition.gameOnInit();
        componentsDefinitions?.forEach((component: any) => isOnInit(component) && component.gameOnInit());

        this.allScenes.push({
            name: sceneOption.name,
            scene: babylonScene,
            camera: camera,
            sceneDefinition: sceneDefinition,
            guiDefinition: guiDefinition,
            componentDefinitions: componentsDefinitions
        });

        if (sceneOption.root) {
            this.rootSceneAdded$.next(sceneOption.name);
        }
    }
}
