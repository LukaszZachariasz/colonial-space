import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {MovementAttributeContainer} from './movement-attribute/movement-attribute.container';
import {ScoutRangeAttributeContainer} from './scout-range-attribute/scout-range-attribute.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitAttributesContainer extends GuiContainer implements AfterCreated {
    public scoutRangeAttributeControl: ScoutRangeAttributeContainer;
    public movementAttributeControl: MovementAttributeContainer;

    constructor(private unitState: UnitState) {
        super('attributes');
    }

    public gameAfterCreated(): void {
        this.control.left = '10px';
        this.control.top = '-10px';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.scoutRangeAttributeControl = new ScoutRangeAttributeContainer(this.unitState);
        this.addControlToContainer(this.scoutRangeAttributeControl);

        this.movementAttributeControl = new MovementAttributeContainer(this.unitState);
        this.addControlToContainer(this.movementAttributeControl);
    }
}
