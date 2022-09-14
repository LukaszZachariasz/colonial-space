import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../../shared/text/text.gui-element';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitNameGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('unitName');

    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement(this.unitState.name, {uppercase: true});

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.left = '60px';
        this.control.adaptWidthToChildren = true;
    }
}
