import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {ToolbarBackgroundGuiElement} from './toolbar-background/toolbar-background.gui-element';
import {ToolbarTitleGuiElement} from './toolbar-title/toolbar-title.gui-element';

@GuiElement()
export class ToolbarGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('toolbar');

    @AppendGuiControl() public toolbarBackground: ToolbarBackgroundGuiElement = new ToolbarBackgroundGuiElement();
    @AppendGuiControl() public toolbarTitle: ToolbarTitleGuiElement = new ToolbarTitleGuiElement();

    public gameOnInit(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
