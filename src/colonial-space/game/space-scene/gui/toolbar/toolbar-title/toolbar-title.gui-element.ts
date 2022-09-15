import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class ToolbarTitleGuiElement implements GuiControl<GUI.Image>, OnInit {
    public control = new GUI.Image('main', 'resources/gui/toolbar/main.png');

    public gameOnInit(): void {
        this.control.width = '25%';
        this.control.height = '50px';
        this.control.top = '10px';
        this.control.alpha = 0.4;
    }
}
