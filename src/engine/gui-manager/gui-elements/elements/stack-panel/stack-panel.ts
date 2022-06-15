import * as GUI from 'babylonjs-gui';
import {Control} from '../control';

export abstract class StackPanel extends Control<GUI.StackPanel> {
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
            this.control.addControl(control.control);
        }
    }
}
