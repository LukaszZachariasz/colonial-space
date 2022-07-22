import {isAfterCreated} from '../../../engine/lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../../../engine/lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../../../engine/lifecycle/on-ready/is-on-ready';


export interface GameObjectDefinition {
    name: string;
    meshUrl: string;
    meshName: string;
}

export function GameObjectFromFile(definition: GameObjectDefinition): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                BABYLON.SceneLoader.ImportMeshAsync(
                    '',
                    definition.meshUrl,
                    definition.meshName,
                    this.scene)
                    .then((result: BABYLON.ISceneLoaderAsyncResult) => {
                        Object.keys(result)
                            .forEach((key: keyof BABYLON.ISceneLoaderAsyncResult) => {
                                this[key] = result[key];
                            });
                    })
                    .then(() => isAfterCreated(this) && this.gameAfterCreated())
                    .then(() => isOnDestroy(this) && this.gameOnDestroy())
                    .then(() => isOnReady(this) && this.gameOnReady());
            }
        };
    };
}


