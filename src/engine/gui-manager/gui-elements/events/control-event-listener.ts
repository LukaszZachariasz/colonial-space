import 'reflect-metadata';
import * as GUI from 'babylonjs-gui';
import {Control} from '../elements/control';
import {ControlEvent} from './control-event';

export const CONTROL_EVENT_LISTENER_METADATA_KEY = 'ControlEventListener';

export function ControlEventListener(controlEvent: ControlEvent): any {
    return function (object: Control<GUI.Control>, methodName: string) {
        const current = Reflect.getMetadata(CONTROL_EVENT_LISTENER_METADATA_KEY, object) || {};
        const newListener: any = {};
        newListener[methodName] = controlEvent;

        Reflect.defineMetadata(CONTROL_EVENT_LISTENER_METADATA_KEY, {
            ...current,
            ...newListener
        }, object);
    };
}


