import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AwarenessIndicatorGuiElement} from './awareness-indicator.gui-element';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class AwarenessHintGuiElement implements GuiControl<GUI.Rectangle>, AfterCreated {
    public static readonly size = '80px';
    public control = new GUI.Rectangle('AwarenessHint');

    public gameAfterCreated(): void {
        this.control.cornerRadius = 20;
        this.control.width = AwarenessHintGuiElement.size;
        this.control.height = AwarenessHintGuiElement.size;
        this.control.color = AwarenessIndicatorGuiElement.AwarenessColor;
        this.control.background = AwarenessIndicatorGuiElement.AwarenessColor;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
