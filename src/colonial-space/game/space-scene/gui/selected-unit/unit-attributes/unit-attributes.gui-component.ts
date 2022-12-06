import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {MovementAttributeGuiComponent} from './movement-attribute/movement-attribute.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {ScoutRangeAttributeGuiComponent} from './scout-range-attribute/scout-range-attribute.gui-component';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

@GuiComponent()
export class UnitAttributesGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendGuiControl() public scoutRangeAttribute: ScoutRangeAttributeGuiComponent = new ScoutRangeAttributeGuiComponent(this.unitState);
    @AppendGuiControl() public movementAttribute: MovementAttributeGuiComponent = new MovementAttributeGuiComponent(this.unitState);

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.left = '10px';
        this.control.top = '-10px';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
