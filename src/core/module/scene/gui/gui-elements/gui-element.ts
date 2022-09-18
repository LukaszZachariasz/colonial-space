import * as GUI from 'babylonjs-gui';
import {APPEND_CONTROL_METADATA_KEY} from './append-gui-control/append-gui-control';
import {CONTROL_EVENT_LISTENER_METADATA_KEY} from './events/control-event-listener';
import {GuiControl} from './gui-control';
import {Injector} from '@colonial-space/core/injector/injector';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {SceneRouter} from '@colonial-space/core/module/scene/scene-router';

export function GuiElement(): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                this['_sceneUid'] = Injector.inject(SceneRouter).activeScene.scene.uid;

                Lifecycle.onInit(this);
                appendControls(this);
                registerControlEventListeners(this);
                this.control.onDisposeObservable.add(() => Lifecycle.onUnload(this));
                this.control.onDisposeObservable.add(() => Lifecycle.onDestroy(this));
                Lifecycle.onLoad(this);
            }
        };
    };
}

function appendControls(instance: any): void {
    let metadataKeys = Reflect.getMetadataKeys(instance);
    metadataKeys = metadataKeys.filter((key: string) => key.includes(APPEND_CONTROL_METADATA_KEY));
    metadataKeys.forEach((key: string) => {
        const metadataValue = Reflect.getMetadata(key, instance);
        metadataValue.appends.forEach((append: {
            parent?: string
            property: string
        }) => {
            if (instance[append.property]) {
                let target = instance;
                if (append.parent) {
                    target = (instance as any)[append.parent];
                }
                if (Array.isArray(instance[append.property])) {
                    instance[append.property].forEach((el: any) => {
                        addControlToContainer(target, el);
                    });
                } else {
                    addControlToContainer(target, instance[append.property]);
                }
            }
        });
    });
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

function addControlToContainer(container: GuiControl<GUI.Control> | GUI.Control, control: GuiControl<GUI.Control> | GUI.Control): void {
    if (container instanceof GUI.Control) {
        if (control instanceof GUI.Control) {
            (container as any).addControl(control);
        } else {
            (container as any).addControl(control.control);
        }
    } else {
        if (control instanceof GUI.Control) {
            (container.control as any).addControl(control);
        } else {
            (container.control as any).addControl(control.control);
        }
    }
}
