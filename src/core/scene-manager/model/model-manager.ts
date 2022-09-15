import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';
import {ImportModelAbstract} from './model-elements/import-model';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {ParticleSystemModel} from './model-elements/particle-system-model';
import {SimpleModel} from './model-elements/simple-model';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';

@Injectable()
export class ModelManager {
    public addSimpleModel<T extends Model<ModelElement>>(model: T): T {
        if (model instanceof SimpleModel || model instanceof ParticleSystemModel) {
            model.onCreate();
            this.createLifecycle(model);
        }
        return model;
    }

    public addImportModel<T extends ImportModelAbstract>(model: T): T {
        return model;
    }

    public removeModel(model: Model<ModelElement>): void {
        model.mesh.dispose();
    }

    private createLifecycle(model: Model<ModelElement>): void {
        isOnUnload(model) && model.mesh.onDisposeObservable.add(() => model.gameOnUnload());
        isOnDestroy(model) && model.mesh.onDisposeObservable.add(() => model.gameOnDestroy());

        isOnLoad(model) && model.gameOnLoad();
    }
}
