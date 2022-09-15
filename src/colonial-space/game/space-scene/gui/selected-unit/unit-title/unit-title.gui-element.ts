import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../shared/icon/icon.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {UnitNameGuiElement} from './unit-name/unit-name.gui-element';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

@GuiElement()
export class UnitTitleGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('title');
    
    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.unitState.icon);
    @AppendGuiControl() public unitName: UnitNameGuiElement = new UnitNameGuiElement(this.unitState);

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
