import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ToolbarBackgroundContainer extends GuiContainer implements AfterCreated {
    public gameAfterCreated(): void {
        this.control.width = '90%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.background = 'rgb(0, 0, 0)';
        this.control.alpha = 0.4;
    }
}
