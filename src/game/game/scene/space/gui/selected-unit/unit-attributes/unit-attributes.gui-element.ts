import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {MovementAttributeGuiElement} from './movement-attribute/movement-attribute.gui-element';
import {ScoutRangeAttributeGuiElement} from './scout-range-attribute/scout-range-attribute.gui-element';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitAttributesGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendGuiControl() public scoutRangeAttribute: ScoutRangeAttributeGuiElement = new ScoutRangeAttributeGuiElement(this.unitState);
    @AppendGuiControl() public movementAttribute: MovementAttributeGuiElement = new MovementAttributeGuiElement(this.unitState);

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.left = '10px';
        this.control.top = '-10px';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
