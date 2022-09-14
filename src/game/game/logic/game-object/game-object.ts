import {isAfterCreated} from '../../../../core/lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../../../../core/lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../../../../core/lifecycle/on-ready/is-on-ready';

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
        const highlightLayer = new BABYLON.HighlightLayer('hover_highlight_layer', that.scene);

        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                highlightLayer.addMesh(that.actionMesh, BABYLON.Color3.Yellow());
            })
        );
        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                that.select();
            })
        );
        that.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                highlightLayer.removeAllMeshes();
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


