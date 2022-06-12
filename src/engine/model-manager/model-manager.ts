import * as BABYLON from 'babylonjs';
import {ImportModel} from './model-elements/import-model';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {ParticleSystemModel} from './model-elements/particle-system-model';
import {SimpleModel} from './model-elements/simple-model';

export class ModelManager {
    public addModel<T extends Model<ModelElement>>(model: T): T {
        if (model instanceof ImportModel) {
            model.onImport()
                .then((result: BABYLON.ISceneLoaderAsyncResult) => model.setImportResult(result))
                .then(() => this.createLifecycle(model));
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
        model.mesh.onDisposeObservable.add(() => {
            model.onDestroy();
        });
        model.onReady();
    }
}
