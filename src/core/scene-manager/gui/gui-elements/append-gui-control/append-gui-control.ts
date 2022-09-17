import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../gui-control';

export function AppendGuiControl(parent?: string): any {
    return function (object: GuiControl<GUI.Control>, propertyKey: string) {
        let state: GuiControl<GUI.Control> | GUI.Control;
        const setter = function (value: GuiControl<GUI.Control> | GUI.Control): void {
            state = value;
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let container: GuiControl<GUI.Control> | GUI.Control | any = this;

            if (parent) {
                container = this[parent];
            }
            if (Array.isArray(this[propertyKey])) {
                this[propertyKey].forEach((el: any) => {
                    addControlToContainer(container, el);
                });
            } else {
                addControlToContainer(container, state);
            }
        };

        Object.defineProperty(object, propertyKey, {
            set: setter,
            get(): GuiControl<GUI.Control> | GUI.Control {
                return state;
            }
        });
    };
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
