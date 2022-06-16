import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../gui-control';

export abstract class GuiContainer implements GuiControl<GUI.Container> {
    public control: GUI.Container = new GUI.Container(this.name);

    constructor(private name: string) {
    }

    public addControlToContainer(control: GuiControl<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            this.control.addControl(control.control);
        }
    }
}
