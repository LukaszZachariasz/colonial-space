import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {ModelNode} from '@colonial-space/core/module/scene/model/node/model-node';

export class ModelImporterNode {
    public static import<T extends ModelNode>(model: T): T {
        model.node.onDisposeObservable.add(() => Lifecycle.onUnload(model));
        model.node.onDisposeObservable.add(() => Lifecycle.onDestroy(model));
        Lifecycle.onLoad(model);
        return model;
    }
}
