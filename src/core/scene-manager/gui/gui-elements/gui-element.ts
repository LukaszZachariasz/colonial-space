import * as GUI from 'babylonjs-gui';
import {APPEND_CONTROL_METADATA_KEY} from './append-gui-control/append-gui-control';
import {AppendGuiControlConfig} from './append-gui-control/append-gui-control-config';
import {CONTROL_EVENT_LISTENER_METADATA_KEY} from './events/control-event-listener';
import {GuiControl} from './gui-control';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';

export function GuiElement(): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                isOnInit(this) && this.gameOnInit();
                appendControls(this);
                registerControlEventListeners(this);
                isOnUnload(this) && this.control.onDisposeObservable.add(() => this.gameOnUnload());
                isOnDestroy(this) && this.control.onDisposeObservable.add(() => this.gameOnDestroy());
                isOnLoad(this) && this.gameOnLoad();
            }
        };
    };
}

function appendControls(instance: any): void {
    let metadataKeys = Reflect.getMetadataKeys(instance);
    metadataKeys = metadataKeys.filter((key: string) => key.includes(APPEND_CONTROL_METADATA_KEY));
    metadataKeys.forEach((key: string) => {
        const metadataValue = Reflect.getMetadata(key, instance);
        metadataValue.appends.sort((a: AppendGuiControlConfig, b: AppendGuiControlConfig) => {
            if (a.order === undefined) {
                return 1;
            }
            return a.order > b.order;
        }).forEach((append: AppendGuiControlConfig & {
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
