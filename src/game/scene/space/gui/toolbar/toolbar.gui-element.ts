import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {ToolbarBackgroundGuiElement} from './toolbar-background/toolbar-background.gui-element';
import {ToolbarTitleGuiElement} from './toolbar-title/toolbar-title.gui-element';

@GuiElement()
export class ToolbarGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('toolbar');

    @AppendGuiControl() public toolbarBackgroundGuiElement: ToolbarBackgroundGuiElement = new ToolbarBackgroundGuiElement();
    @AppendGuiControl() public toolbarTitleGuiElement: ToolbarTitleGuiElement = new ToolbarTitleGuiElement();

    public gameAfterCreated(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
