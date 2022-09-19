import * as GUI from 'babylonjs-gui';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class ToolbarBackgroundGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('toolbarBackgroundContainer');
    
    public gameOnInit(): void {
        this.control.width = '90%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.background = 'rgb(0, 0, 0)';
        this.control.alpha = 0.4;
    }
}
