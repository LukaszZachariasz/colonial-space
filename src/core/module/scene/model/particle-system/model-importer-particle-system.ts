import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ModelParticleSystem} from '@colonial-space/core/module/scene/model/particle-system/model-particle-system';

export class ModelImporterParticleSystem {
    public static import<T extends ModelParticleSystem>(model: T): T {
        model.particleSystem.onDisposeObservable.add(() => Lifecycle.onUnload(model));
        model.particleSystem.onDisposeObservable.add(() => Lifecycle.onDestroy(model));
        Lifecycle.onLoad(model);
        return model;
    }
}
