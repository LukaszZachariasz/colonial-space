import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {UnitArtControl} from './unit-art/unit-art.control';
import {UnitAttributesContainer} from './unit-attributes/unit-attributes.container';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {UnitTitleContainer} from './unit-title/unit-title.container';
import {logic} from '../../../../game';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class SelectedUnitContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('selectedUnitContainer');
    
    public unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

    @AppendControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendControl() public unitArtControl: UnitArtControl = new UnitArtControl(this.unitState);
    @AppendControl() public unitTitleContainer: UnitTitleContainer = new UnitTitleContainer(this.unitState);
    @AppendControl() public unitAttributesContainer: UnitAttributesContainer = new UnitAttributesContainer(this.unitState);

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '40%';
        this.control.left = '30px';
        this.control.top = '-50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
    }
}
