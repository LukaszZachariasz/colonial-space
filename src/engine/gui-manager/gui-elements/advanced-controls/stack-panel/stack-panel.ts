import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../gui-control';

export abstract class StackPanel implements GuiControl<GUI.StackPanel> {
    public control: GUI.StackPanel = new GUI.StackPanel(this.name);

    constructor(private name: string) {
    }

    public addControlToStackPanel(control: GuiControl<GUI.Control> | GUI.Control): void {
        if (control instanceof GUI.Control) {
            this.control.addControl(control);
        } else {
            this.control.addControl(control.control);
        }
    }
}
