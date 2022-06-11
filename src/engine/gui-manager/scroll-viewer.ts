import * as GUI from 'babylonjs-gui';
import {Control} from './control';

export class ScrollViewer extends Control<GUI.ScrollViewer> {
    constructor(private name: string) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.ScrollViewer(this.name);
    }

    public addControlToScrollViewer(control: Control<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            control.create();
            this.control.addControl(control.control);
        }
    }
}
