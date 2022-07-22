import * as BABYLON from 'babylonjs';
import {isAfterCreated} from '../../../engine/lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../../../engine/lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../../../engine/lifecycle/on-ready/is-on-ready';


export interface GameObjectDefinition {
    name: string;
    meshUrl: string;
    meshName: string;
}

export function GameObjectFromFile(definition: GameObjectDefinition): any {
    function setRootMeshes(that: any): any {
        that.primaryMesh = that.meshes[0];
        that.actionMesh = that.primaryMesh.getChildMeshes()[0];
        return that;
    }

    function addActionManager(that: any): any {
        that.actionManager = new BABYLON.ActionManager(that.scene);
        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                that.actionMesh.overlayColor = new BABYLON.Color3(0.1, 1, 0.2);
                that.actionMesh.overlayAlpha = 0.3;
                that.actionMesh.renderOverlay = true;
            })
        );
        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                that.select();
            })
        );
        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                that.actionMesh.renderOverlay = false;
            })
        );
        that.actionMesh.actionManager = that.actionManager;

        return that;
    }

    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                BABYLON.SceneLoader.ImportMeshAsync('', definition.meshUrl, definition.meshName, this.scene)
                    .then((result: BABYLON.ISceneLoaderAsyncResult) => Object.keys(result).forEach((key: keyof BABYLON.ISceneLoaderAsyncResult) => this[key] = result[key]))
                    .then(() => setRootMeshes(this))
                    .then(() => addActionManager(this))
                    .then(() => isAfterCreated(this) && this.gameAfterCreated())
                    .then(() => isOnReady(this) && this.gameOnReady())
                    .then(() => isOnDestroy(this) && this.primaryMesh.onDisposeObservable.add(() => this.gameOnDestroy()));
            }
        };
    };
}


