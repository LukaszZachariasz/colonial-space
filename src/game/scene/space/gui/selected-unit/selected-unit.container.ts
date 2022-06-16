import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {UnitArtControl} from './unit-art/unit-art.control';
import {UnitAttributesContainer} from './unit-attributes/unit-attributes.container';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {UnitTitleContainer} from './unit-title/unit-title.container';
import {logic} from '../../../../game';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class SelectedUnitContainer extends GuiContainer implements AfterCreated {
    public backgroundImage: GUI.Image;
    public unitArtControl: UnitArtControl;
    public unitTitleContainer: UnitTitleContainer;
    public unitAttributesContainer: UnitAttributesContainer;
    public unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

    constructor() {
        super('selectedUnitContainer');
    }

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '40%';
        this.control.left = '30px';
        this.control.top = '-50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.addControlToContainer(this.backgroundImage);

        this.unitArtControl = new UnitArtControl(this.unitState);
        this.addControlToContainer(this.unitArtControl);

        this.unitTitleContainer = new UnitTitleContainer(this.unitState);
        this.addControlToContainer(this.unitTitleContainer);

        this.unitAttributesContainer = new UnitAttributesContainer(this.unitState);
        this.addControlToContainer(this.unitAttributesContainer);
    }
}
