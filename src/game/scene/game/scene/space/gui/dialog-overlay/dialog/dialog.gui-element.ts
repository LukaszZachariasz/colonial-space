import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control = new GUI.Container('dialog');

    @AppendGuiControl() private body: GuiControl<GUI.Control>;

    constructor(body: GuiControl<GUI.Control>) {
        this.body = body;
    }

    public gameOnInit(): void {
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }
}
