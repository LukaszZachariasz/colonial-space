import {ImportModelAbstract} from './model-elements/import-model';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Model} from './model-elements/model';
import {ModelElement} from './model-element';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';

@Injectable()
export class ModelManager {
    public addModel<T extends Model<ModelElement>>(model: T): T {
        isOnInit(model) && model.gameOnInit();
        isOnUnload(model) && model.mesh.onDisposeObservable.add(() => model.gameOnUnload());
        isOnDestroy(model) && model.mesh.onDisposeObservable.add(() => model.gameOnDestroy());

        isOnLoad(model) && model.gameOnLoad();
        return model;
    }

    public addImportModel<T extends ImportModelAbstract>(model: T): T {
        return model;
    }

    public removeModel(model: Model<ModelElement>): void {
        model.mesh.dispose();
    }
}
