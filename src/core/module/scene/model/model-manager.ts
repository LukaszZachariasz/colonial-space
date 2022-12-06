import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ModelFromFile} from '@colonial-space/core/module/scene/model/from-file/model-from-file';
import {ModelImporterFromFile} from '@colonial-space/core/module/scene/model/from-file/model-importer-from-file';
import {ModelImporterMesh} from '@colonial-space/core/module/scene/model/mesh/model-importer-mesh';
import {ModelImporterNode} from '@colonial-space/core/module/scene/model/node/model-importer-node';
import {ModelImporterParticleSystem} from '@colonial-space/core/module/scene/model/particle-system/model-importer-particle-system';
import {ModelMesh} from '@colonial-space/core/module/scene/model/mesh/model-mesh';
import {ModelNode} from '@colonial-space/core/module/scene/model/node/model-node';
import {ModelParticleSystem} from '@colonial-space/core/module/scene/model/particle-system/model-particle-system';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {Type} from '@colonial-space/core/type';

@Injectable()
export class ModelManager {
    @Inject(SCENE) private scene: BABYLON.Scene;

    public create<T extends ModelMesh | ModelNode | ModelParticleSystem | ModelFromFile>(model: Type<T>, ...args: any[]): T {
        const instance = new model(...args);
        (instance as any)['_sceneUid'] = this.scene.uid;
        Lifecycle.onInit(instance);

        if (instance instanceof ModelMesh) {
            return ModelImporterMesh.import(instance);
        }
        if (instance instanceof ModelNode) {
            return ModelImporterNode.import(instance);
        }
        if (instance instanceof ModelParticleSystem) {
            return ModelImporterParticleSystem.import(instance);
        }
        if (instance instanceof ModelFromFile) {
            return ModelImporterFromFile.import(instance, this.scene);
        }
    }

    public removeModel<T extends ModelMesh | ModelNode | ModelParticleSystem | ModelFromFile>(model: T): void {
        if (model instanceof ModelMesh) {
            return model.mesh.dispose();
        }
        if (model instanceof ModelNode) {
            return model.node.dispose();
        }
        if (model instanceof ModelParticleSystem) {
            model.emitter.dispose();
            return model.particleSystem.dispose();
        }
        if (model instanceof ModelFromFile) {
            model.primaryMesh.dispose();
        }
    }
}
