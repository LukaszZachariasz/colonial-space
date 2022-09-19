import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {AttributeGuiComponent} from '../../../shared/attribute/attribute.gui-component';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../../shared/icon/icon.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../../../../shared/gui/text/text.gui-component';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';

@GuiComponent()
export class ScoutRangeAttributeGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('scoutRangeAttribute');
    
    @AppendGuiControl() public attribute: AttributeGuiComponent = new AttributeGuiComponent(
        new IconGuiComponent(GameIcon.BINOCULARS),
        new TextGuiComponent(`This unit has ${this.unitState.scoutRange} scout range.`)
    );

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
