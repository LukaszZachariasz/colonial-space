import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../gui-control';

export const APPEND_CONTROL_METADATA_KEY = 'AppendGuiControl';

export function AppendGuiControl(parent?: string): any {
    return function (object: GuiControl<GUI.Control>, propertyKey: string) {
        const current = Reflect.getMetadata(APPEND_CONTROL_METADATA_KEY, object) || {appends: []};

        Reflect.defineMetadata(APPEND_CONTROL_METADATA_KEY, {
            appends: [...current.appends, {
                parent: parent || '',
                property: propertyKey
            }]
        }, object);
    };
}
