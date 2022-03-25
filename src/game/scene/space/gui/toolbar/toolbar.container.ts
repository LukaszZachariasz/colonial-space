import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {ToolbarBackgroundContainer} from './toolbar-background/toolbar-background.container';
import {ToolbarTitleControl} from './toolbar-title/toolbar-title.control';

export class ToolbarContainer extends Container {
    public toolbarBackground: ToolbarBackgroundContainer;
    public toolbarTitleGuiObject: ToolbarTitleControl;

    public static TOOLBAR_OPACITY = 0.4;

    public render(): GUI.Control {
        this.container = new GUI.Container('toolbar');
        this.container.height = '130px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.toolbarBackground = new ToolbarBackgroundContainer();
        this.toolbarTitleGuiObject = new ToolbarTitleControl();

        this.container.addControl(this.toolbarBackground.render());
        this.container.addControl(this.toolbarTitleGuiObject.render());

        return this.container;
    }
}
