import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {AttributeGuiElement} from '../../../shared/attribute/attribute.gui-element';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {TextGuiElement} from '../../../shared/text/text.gui-element';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class ScoutRangeAttributeGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('scoutRangeAttribute');
    
    @AppendGuiControl() public attribute: AttributeGuiElement = new AttributeGuiElement(
        new IconGuiElement(GameIcon.BINOCULARS),
        new TextGuiElement(`This unit has ${this.unitState.scoutRange} scout range.`)
    );

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
