import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';

// TODO: improve that class (look at implementations of tooltip)
@GuiElement()
export class TooltipGuiElement implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    public control: GUI.Container = new GUI.Container('tooltipContainer');

    @AppendGuiControl() private content: GuiControl<GUI.Control>;

    constructor(content: GuiControl<GUI.Control>) {
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
