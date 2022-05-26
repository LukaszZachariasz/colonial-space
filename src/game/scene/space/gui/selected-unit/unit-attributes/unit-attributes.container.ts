import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {MovementAttributeControl} from './movement-attribute/movement-attribute.control';
import {ScoutRangeAttributeControl} from './scout-range-attribute/scout-range-attribute.control';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class UnitAttributesContainer extends Container {
    public scoutRangeAttributeControl: GUI.Control;
    public movementAttributeControl: GUI.Control;

    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Container {
        this.container = new GUI.Container('attributes');
        this.container.left = '10px';
        this.container.top = '-10px';
        this.container.height = '50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.scoutRangeAttributeControl = new ScoutRangeAttributeControl(this.unitState).render();
        this.container.addControl(this.scoutRangeAttributeControl);

        this.movementAttributeControl = new MovementAttributeControl(this.unitState).render();
        this.movementAttributeControl.left = '70px';
        this.container.addControl(this.movementAttributeControl);

        return this.container;
    }    
}
