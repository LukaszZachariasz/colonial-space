import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {ToolbarBackgroundContainer} from './toolbar-background/toolbar-background.container';
import {ToolbarTitleControl} from './toolbar-title/toolbar-title.control';

@GuiElement()
export class ToolbarContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('toolbar');

    @AppendControl() public toolbarBackground: ToolbarBackgroundContainer = new ToolbarBackgroundContainer();
    @AppendControl() public toolbarTitle: ToolbarTitleControl = new ToolbarTitleControl();

    public gameAfterCreated(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
