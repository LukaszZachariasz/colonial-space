import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {ToolbarBackgroundGuiComponent} from './toolbar-background/toolbar-background.gui-component';
import {ToolbarTitleGuiComponent} from './toolbar-title/toolbar-title.gui-component';

@GuiComponent()
export class ToolbarGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('toolbar');

    @AppendGuiControl() public toolbarBackground: ToolbarBackgroundGuiComponent = new ToolbarBackgroundGuiComponent();
    @AppendGuiControl() public toolbarTitle: ToolbarTitleGuiComponent = new ToolbarTitleGuiComponent();

    public gameOnInit(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
