import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../gui-object';
import {ToolbarGuiContainer} from '../toolbar.gui-container';

export class ToolbarTitleGuiObject extends GuiObject {
    public mainImage: GUI.Image;

    public render(): GUI.Control {
        this.mainImage = new GUI.Image('main', 'resources/gui/toolbar/main.png');
        this.mainImage.width = '25%';
        this.mainImage.height = '50px';
        this.mainImage.top = '10px';

        this.mainImage.alpha = ToolbarGuiContainer.TOOLBAR_OPACITY;

        return this.mainImage;
    }
}