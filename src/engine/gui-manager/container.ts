import * as GUI from 'babylonjs-gui';
import {Control} from './control';

export class Container extends Control<GUI.Container> {
    constructor(private name: string) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.Container(this.name);
    }

    public addControlToContainer(control: Control<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            control.create();
            this.control.addControl(control.control);
        }
    }
}
