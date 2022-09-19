import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../shared/text/text.gui-component';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';

@GuiComponent()
export class UnitNameGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('unitName');

    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent(this.unitState.name, {uppercase: true});

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.left = '60px';
        this.control.adaptWidthToChildren = true;
    }
}
