import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ModelMesh} from '@colonial-space/core/module/scene/model/mesh/model-mesh';

export class ModelImporterMesh {
    public static import<T extends ModelMesh>(model: T): T {
        model.mesh.onDisposeObservable.add(() => Lifecycle.onUnload(model));
        model.mesh.onDisposeObservable.add(() => Lifecycle.onDestroy(model));
        Lifecycle.onLoad(model);
        return model;
    }
}
