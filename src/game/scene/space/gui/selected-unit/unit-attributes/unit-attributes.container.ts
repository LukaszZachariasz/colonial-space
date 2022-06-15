import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {MovementAttributeContainer} from './movement-attribute/movement-attribute.container';
import {ScoutRangeAttributeContainer} from './scout-range-attribute/scout-range-attribute.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitAttributesContainer extends Container {
    public scoutRangeAttributeControl: ScoutRangeAttributeContainer;
    public movementAttributeControl: MovementAttributeContainer;

    constructor(private unitState: UnitState) {
        super('attributes');
    }

    public onCreate(): void {
        super.onCreate();
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
