import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {DialogGuiElement} from './dialog/dialog.gui-element';
import {GuiControl} from '../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../core/gui-manager/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class DialogOverlayGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('dialogOverlay');

    @AppendGuiControl() public dialog: DialogGuiElement = new DialogGuiElement(this.body);

    constructor(private body: GuiControl<GUI.Control>) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;
    }
}
