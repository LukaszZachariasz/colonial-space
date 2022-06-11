import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {ToolbarContainer} from '../toolbar.container';

export class ToolbarTitleControl extends Control<GUI.Image> {
    public onCreate(): void {
        this.control = new GUI.Image('main', 'resources/gui/toolbar/main.png');
    }

    public onApplyStyles(): void {
        this.control.width = '25%';
        this.control.height = '50px';
        this.control.top = '10px';
        this.control.alpha = ToolbarContainer.TOOLBAR_OPACITY;
    }
}
