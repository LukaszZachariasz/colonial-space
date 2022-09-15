import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
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
