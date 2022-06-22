import {ImportModelAbstract} from './model-elements/import-model';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {ParticleSystemModel} from './model-elements/particle-system-model';
import {SimpleModel} from './model-elements/simple-model';
import {isOnDestroy} from '../lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../lifecycle/on-ready/is-on-ready';

export class ModelManager {
    public addModel<T extends Model<ModelElement>>(model: T): T {
        if (model instanceof ImportModelAbstract) {

        } else if (model instanceof SimpleModel || model instanceof ParticleSystemModel) {
            model.onCreate();
            this.createLifecycle(model);
        }

        return model;
    }

    public removeModel(model: Model<ModelElement>): void {
        model.mesh.dispose();
    }

    private createLifecycle(model: Model<ModelElement>): void {
        if (isOnDestroy(model)) {
            model.mesh.onDisposeObservable.add(() => {
                model.gameOnDestroy();
            });
        }

        if (isOnReady(model)) {
            model.gameOnReady();
        }
    }
}
