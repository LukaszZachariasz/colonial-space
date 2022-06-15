import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ToolbarBackgroundContainer extends Container {
    public onCreate(): void {
        super.onCreate();
        this.control.width = '90%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.background = 'rgb(0, 0, 0)';
        this.control.alpha = 0.4;
    }
}
