import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

// TODO: improve that class (look at implementations of tooltip)
@GuiComponent()
export class TooltipGuiComponent implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    public control: GUI.Container = new GUI.Container('tooltipContainer');

    @AppendGuiControl() private content: GuiControl;

    constructor(content: GuiControl) {
        this.content = content;
    }

    public gameOnInit(): void {
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.content.control.setPaddingInPixels(10, 10, 10, 10);
    }

    public gameOnDestroy(): void {
        this.content.control.dispose();
    }
}
