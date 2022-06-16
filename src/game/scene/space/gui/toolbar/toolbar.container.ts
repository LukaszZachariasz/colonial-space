import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {ToolbarBackgroundContainer} from './toolbar-background/toolbar-background.container';
import {ToolbarTitleControl} from './toolbar-title/toolbar-title.control';

@GuiElement()
export class ToolbarContainer extends GuiContainer implements AfterCreated {
    public toolbarBackground: ToolbarBackgroundContainer;
    public toolbarTitle: ToolbarTitleControl;

    constructor() {
        super('toolbar');
    }

    public gameAfterCreated(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.toolbarBackground = new ToolbarBackgroundContainer('toolbarBackground');
        this.addControlToContainer(this.toolbarBackground);

        this.toolbarTitle = new ToolbarTitleControl();
        this.addControlToContainer(this.toolbarTitle);
    }
}
