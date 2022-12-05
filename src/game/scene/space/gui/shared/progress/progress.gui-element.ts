import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiColors} from '../palette/colors';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ProgressGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    private static readonly defaultHeight = '40px';

    public control = new GUI.Container('control');
    public progressControl = new GUI.Container('progressControl');

    public setProgress(percentage: number): void {
        if (percentage > 100 || percentage < 0) {
            return;
        }
        this.progressControl.width = percentage / 100;
    }

    public setColor(color: string): void {
        this.progressControl.background = color;
        this.progressControl.color = color;
    }

    public setHeight(height: string): void {
        this.control.height = height;
        this.progressControl.height = height;
    }

    constructor(private reversed: boolean = false) {
    }

    public gameAfterCreated(): void {
        this.progressControl.background = GuiColors.Neutral;
        this.control.background = GuiColors.Back;
        this.control.color = GuiColors.Back;

        this.control.height = ProgressGuiElement.defaultHeight;
        this.progressControl.height = ProgressGuiElement.defaultHeight;

        this.control.width = '100%';
        this.progressControl.width = 0;

        this.progressControl.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        if (this.reversed) {
            this.progressControl.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        }

        this.control.addControl(this.progressControl);
    }
}
