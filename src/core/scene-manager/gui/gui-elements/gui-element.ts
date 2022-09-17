import * as GUI from 'babylonjs-gui';
import {CONTROL_EVENT_LISTENER_METADATA_KEY} from './events/control-event-listener';
import {Injector} from '@colonial-space/core/injector/injector';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {SceneRouter} from '@colonial-space/core/scene-manager/router/scene-router';

export function GuiElement(): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                this['_sceneUid'] = Injector.inject(SceneRouter).activeScene.scene.uid;

                Lifecycle.onInit(this);
                registerControlEventListeners(this);
                this.control.onDisposeObservable.add(() => Lifecycle.onUnload(this));
                this.control.onDisposeObservable.add(() => Lifecycle.onDestroy(this));
                Lifecycle.onLoad(this);
            }
        };
    };
}

function registerControlEventListeners(instance: any): void {
    let metadataKeys = Reflect.getMetadataKeys(instance);
    metadataKeys = metadataKeys.filter((key: string) => key.includes(CONTROL_EVENT_LISTENER_METADATA_KEY));
    metadataKeys.forEach((key: string) => {
        const metadataValue = Reflect.getMetadata(key, instance);
        Object.keys(metadataValue).forEach((method: string) => {
            (instance.control as any)[metadataValue[method]].add((eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState) => (instance as any)[method](eventData, eventState));
        });
    });
}

