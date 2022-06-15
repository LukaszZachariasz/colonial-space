import * as GUI from 'babylonjs-gui';
import {CONTROL_EVENT_LISTENER_METADATA_KEY} from './events/control-event-listener';
import {Control} from './elements/control';
import {isOnDestroy} from '../../lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../../lifecycle/on-ready/is-on-ready';

export function GuiElement(): any {
    return function (constructor: any): any {
        const original = constructor;

        const overrideConstructor: any = function (...args: any[]) {
            const instance = new original(...args) as Control<GUI.Control>;

            instance.onCreate();
            registerControlEventListeners(instance);
            if (isOnDestroy(instance)) {
                instance.control.onDisposeObservable.add(() => {
                    instance.gameOnDestroy();
                });
            }
            if (isOnReady(instance)) {
                instance.gameOnReady();
            }

            return instance;
        };

        overrideConstructor.prototype = original.prototype;
        return overrideConstructor;
    };
}


function registerControlEventListeners(instance: Control<GUI.Control>): void {
    let metadataKeys = Reflect.getMetadataKeys(instance);
    metadataKeys = metadataKeys.filter((key: string) => key.includes(CONTROL_EVENT_LISTENER_METADATA_KEY));
    metadataKeys.forEach((key: string) => {
        const metadataValue = Reflect.getMetadata(key, instance);
        Object.keys(metadataValue).forEach((method: string) => {
            (instance.control as any)[metadataValue[method]].add((eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState) => (instance as any)[method](eventData, eventState));
        });
    });
}
