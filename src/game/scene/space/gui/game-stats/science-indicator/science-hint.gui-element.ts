import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {ScienceIndicatorGuiElement} from './science-indicator.gui-element';

@GuiElement()
export class ScienceHintGuiElement implements GuiControl<GUI.Rectangle>, AfterCreated {
    public static readonly size = '80px';
    public control = new GUI.Rectangle('ScienceHint');

    public gameAfterCreated(): void {
        this.control.cornerRadius = 20;
        this.control.width = ScienceHintGuiElement.size;
        this.control.height = ScienceHintGuiElement.size;
        this.control.color = ScienceIndicatorGuiElement.ScienceColor;
        this.control.background = ScienceIndicatorGuiElement.ScienceColor;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }
}
