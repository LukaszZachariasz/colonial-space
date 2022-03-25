import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {ToolbarContainer} from '../toolbar.container';

export class ToolbarTitleControl extends Control {
    public mainImage: GUI.Image;

    public render(): GUI.Control {
        this.mainImage = new GUI.Image('main', 'resources/gui/toolbar/main.png');
        this.mainImage.width = '25%';
        this.mainImage.height = '50px';
        this.mainImage.top = '10px';

        this.mainImage.alpha = ToolbarContainer.TOOLBAR_OPACITY;

        return this.mainImage;
    }
}
