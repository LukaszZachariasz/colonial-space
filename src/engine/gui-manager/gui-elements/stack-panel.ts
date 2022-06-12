import * as GUI from 'babylonjs-gui';
import {Control} from './control';
import {guiManager} from 'engine';

export class StackPanel extends Control<GUI.StackPanel> {
    constructor(private name: string) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.StackPanel(this.name);
    }

    public addControlToStackPanel(control: Control<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            guiManager().createLifecycle(control);
            this.control.addControl(control.control);
        }
    }
}
