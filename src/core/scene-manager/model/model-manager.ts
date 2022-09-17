import * as BABYLON from 'babylonjs';
import {IMPORT_DEFINITION_METADATA_KEY} from '@colonial-space/core/scene-manager/model/game-object';
import {ImportModelAbstract} from './model-elements/import-model';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {ParticleSystemModel} from '@colonial-space/core/scene-manager/model/model-elements/particle-system-model';
import {Type} from '@colonial-space/core/type';

@Injectable({
    providedIn: 'root'
})
export class ModelManager {
    public addModel<T extends Model<ModelElement>>(model: Type<T>, scene: BABYLON.Scene, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = scene.uid;
        Lifecycle.onInit(instance);
        instance.mesh.onDisposeObservable.add(() => Lifecycle.onUnload(instance));
        instance.mesh.onDisposeObservable.add(() => Lifecycle.onDestroy(instance));
        Lifecycle.onLoad(instance);
        return instance;
    }

    public addParticleSystem<T extends ParticleSystemModel>(model: Type<T>, scene: BABYLON.Scene, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = scene.uid;
        Lifecycle.onInit(instance);
        instance.particleSystem.onDisposeObservable.add(() => Lifecycle.onUnload(instance));
        instance.particleSystem.onDisposeObservable.add(() => Lifecycle.onDestroy(instance));
        Lifecycle.onLoad(instance);
        return instance;
    }

    public addImportModel<T extends ImportModelAbstract>(model: Type<T>, scene: BABYLON.Scene, ...args: any): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = scene.uid;
        Lifecycle.onInit(instance);

        const definition = Reflect.getMetadata(IMPORT_DEFINITION_METADATA_KEY, model);

        BABYLON.SceneLoader.ImportMeshAsync('', definition.meshUrl, definition.meshName, scene)
            .then((result: BABYLON.ISceneLoaderAsyncResult) => Object.keys(result).forEach((key: keyof BABYLON.ISceneLoaderAsyncResult) => (instance as any)[key] = result[key]))
            .then(() => this.setRootMeshes(instance))
            .then(() => this.addActionManager(instance))
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
    
    private addActionManager(that: any): any {
        that.actionManager = new BABYLON.ActionManager(that.scene);
        const highlightLayer = new BABYLON.HighlightLayer('hover_highlight_layer', that.scene);
        that.actionMesh.enablePointerMoveEvents = false;

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
}
