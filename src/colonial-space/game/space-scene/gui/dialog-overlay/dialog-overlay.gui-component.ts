import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {DialogGuiComponent} from './dialog/dialog.gui-component';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class DialogOverlayGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('dialogOverlay');

    @AppendGuiControl() public dialog: DialogGuiComponent = new DialogGuiComponent(this.body);

    constructor(private body: GuiControl) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;
    }
}
