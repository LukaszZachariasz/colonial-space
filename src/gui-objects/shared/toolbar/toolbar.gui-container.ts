import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../gui-container';
import {ToolbarBackground} from './toolbar-background/toolbar-background';
import {ToolbarTitleGuiObject} from './toolbar-title/toolbar-title.gui-object';

export class ToolbarGuiContainer extends GuiContainer {
    public toolbarBackground: ToolbarBackground;
    public toolbarTitleGuiObject: ToolbarTitleGuiObject;

    public static TOOLBAR_OPACITY = 0.4;

    public render(): GUI.Control {
        this.container = new GUI.Container('toolbar');
        this.container.height = '130px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.toolbarBackground = new ToolbarBackground();
        this.toolbarTitleGuiObject = new ToolbarTitleGuiObject();

        this.container.addControl(this.toolbarBackground.render());
        this.container.addControl(this.toolbarTitleGuiObject.render());

        return this.container;
    }
}