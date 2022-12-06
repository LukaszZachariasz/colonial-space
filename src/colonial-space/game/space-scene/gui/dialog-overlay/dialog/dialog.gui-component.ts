import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class DialogGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control = new GUI.Container('dialog');

    @AppendGuiControl() private body: GuiControl;

    constructor(body: GuiControl) {
        this.body = body;
    }

    public gameOnInit(): void {
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }
}
