import * as GUI from 'babylonjs-gui';
import {Container} from '../../container';
import {ToolbarContainer} from '../toolbar.container';

export class ToolbarBackgroundContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('toolbarBackground');
        this.container.width = '90%';
        this.container.height = '50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.background = 'rgb(0, 0, 0)';
        this.container.alpha = ToolbarContainer.TOOLBAR_OPACITY;
        return this.container;
    }

}
