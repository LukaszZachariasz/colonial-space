import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {MovementAttributeContainer} from './movement-attribute/movement-attribute.container';
import {ScoutRangeAttributeContainer} from './scout-range-attribute/scout-range-attribute.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitAttributesContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendControl() public scoutRangeAttributeControl: ScoutRangeAttributeContainer = new ScoutRangeAttributeContainer(this.unitState);
    @AppendControl() public movementAttributeControl: MovementAttributeContainer = new MovementAttributeContainer(this.unitState);

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
