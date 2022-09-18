import * as BABYLON from 'babylonjs';
import {IMPORT_DEFINITION_METADATA_KEY} from '@colonial-space/core/scene-manager/model/game-object';
import {ImportModelAbstract} from './model-elements/import-model';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {ParticleSystemModel} from '@colonial-space/core/scene-manager/model/model-elements/particle-system-model';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {Type} from '@colonial-space/core/type';

@Injectable()
export class ModelManager {
    @Inject(SCENE) private scene: BABYLON.Scene;

    public addModel<T extends Model<ModelElement>>(model: Type<T>, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = this.scene.uid;
        Lifecycle.onInit(instance);
        instance.mesh.onDisposeObservable.add(() => Lifecycle.onUnload(instance));
        instance.mesh.onDisposeObservable.add(() => Lifecycle.onDestroy(instance));
        Lifecycle.onLoad(instance);
        return instance;
    }

    public addParticleSystem<T extends ParticleSystemModel>(model: Type<T>, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = this.scene.uid;
        Lifecycle.onInit(instance);
        instance.particleSystem.onDisposeObservable.add(() => Lifecycle.onUnload(instance));
        instance.particleSystem.onDisposeObservable.add(() => Lifecycle.onDestroy(instance));
        Lifecycle.onLoad(instance);
        return instance;
    }

    public addImportModel<T extends ImportModelAbstract>(model: Type<T>, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = this.scene.uid;
        Lifecycle.onInit(instance);

        const definition = Reflect.getMetadata(IMPORT_DEFINITION_METADATA_KEY, model);

        BABYLON.SceneLoader.ImportMeshAsync('', definition.meshUrl, definition.meshName, this.scene)
            .then((result: BABYLON.ISceneLoaderAsyncResult) => Object.keys(result).forEach((key: keyof BABYLON.ISceneLoaderAsyncResult) => (instance as any)[key] = result[key]))
            .then(() => this.setRootMeshes(instance))
            .then(() => instance.primaryMesh.onDisposeObservable.add(() => Lifecycle.onUnload(instance)))
            .then(() => instance.primaryMesh.onDisposeObservable.add(() => Lifecycle.onDestroy(instance)))
            .then(() => Lifecycle.onLoad(instance));
        
        return instance;
    }

    public removeModel(model: Model<ModelElement>): void {
        model.mesh.dispose();
    }
    
    private setRootMeshes(that: any): any {
        that.primaryMesh = that.meshes[0];
        that.actionMesh = that.primaryMesh.getChildMeshes()[0];
        return that;
    }
}
