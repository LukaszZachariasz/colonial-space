import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/container';
import {ToolbarContainer} from '../toolbar.container';

export class ToolbarBackgroundContainer extends Container {
    public onApplyStyles(): void {
        this.control.width = '90%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.background = 'rgb(0, 0, 0)';
        this.control.alpha = ToolbarContainer.TOOLBAR_OPACITY;
    }
}
