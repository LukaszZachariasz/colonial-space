import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../gui-control';

export abstract class GuiScrollViewer implements GuiControl<GUI.ScrollViewer> {
    public control = new GUI.ScrollViewer(this.name);

    constructor(private name: string) {
    }

    public addControlToScrollViewer(control: GuiControl<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            this.control.addControl(control.control);
        }
    }
}
