import * as GUI from 'babylonjs-gui';
import {APPEND_CONTROL_METADATA_KEY} from './append-control/append-control';
import {CONTROL_EVENT_LISTENER_METADATA_KEY} from './events/control-event-listener';
import {GuiControl} from './gui-control';
import {isAfterCreated} from '../../lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../../lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../../lifecycle/on-ready/is-on-ready';

export function GuiElement(): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                if (isAfterCreated(this)) {
                    this.gameAfterCreated();
                }
                appendControls(this);
                registerControlEventListeners(this);
                if (isOnDestroy(this)) {
                    this.control.onDisposeObservable.add(() => {
                        this.gameOnDestroy();
                    });
                }
                if (isOnReady(this)) {
                    this.gameOnReady();
                }
            }
        };
    };
}

function appendControls(instance: any): void {
    let metadataKeys = Reflect.getMetadataKeys(instance);
    metadataKeys = metadataKeys.filter((key: string) => key.includes(APPEND_CONTROL_METADATA_KEY));
    metadataKeys.forEach((key: string) => {
        const metadataValue = Reflect.getMetadata(key, instance);
        metadataValue.appends.forEach((property: string) => {
            addControlToContainer(instance, instance[property]);
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

function addControlToContainer(container: GuiControl<GUI.Control>, control: GuiControl<GUI.Control> | GUI.Control): void {
    if (control instanceof GUI.Control) {
        (container.control as any).addControl(control);
    } else {
        (container.control as any).addControl(control.control);
    }
}
