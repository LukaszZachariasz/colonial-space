import * as BABYLON from 'babylonjs';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {MODEL_RESOURCE_METADATA_KEY} from '@colonial-space/core/module/scene/model/from-file/model-resource.decorator';
import {ModelFromFile} from '@colonial-space/core/module/scene/model/from-file/model-from-file';

export class ModelImporterFromFile {
    public static import<T extends ModelFromFile>(model: T, scene: BABYLON.Scene): T {

        const definition = Reflect.getMetadata(MODEL_RESOURCE_METADATA_KEY, model.constructor);

        BABYLON.SceneLoader.ImportMeshAsync('', definition.meshUrl, definition.meshName, scene)
            .then((result: BABYLON.ISceneLoaderAsyncResult) => Object.keys(result).forEach((key: keyof BABYLON.ISceneLoaderAsyncResult) => (model as any)[key] = result[key]))
            .then(() => this.setRootMeshes(model))
            .then(() => model.primaryMesh.onDisposeObservable.add(() => Lifecycle.onUnload(model)))
            .then(() => model.primaryMesh.onDisposeObservable.add(() => Lifecycle.onDestroy(model)))
            .then(() => Lifecycle.onLoad(model));

        return model;
    }

    private static setRootMeshes(model: ModelFromFile): void {
        model.primaryMesh = model.meshes[0];
        model.actionMesh = model.primaryMesh.getChildMeshes()[0];
    }
}
