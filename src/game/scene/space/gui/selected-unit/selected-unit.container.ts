import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {SelectedUnitArtControl} from './selected-unit-art/selected-unit-art.control';
import {SelectedUnitAttributesContainer} from './selected-unit-attributes/selected-unit-attributes.container';
import {SelectedUnitTitleContainer} from './selected-unit-title/selected-unit-title.container';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

export class SelectedUnitContainer extends Container {
    public backgroundImage: GUI.Image;
    public unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

    public render(): GUI.Control {
        this.container = new GUI.Container('selectedUnitContainer');
        this.container.width = '25%';
        this.container.height = '40%';
        this.container.left = '30px';
        this.container.top = '-50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.container.addControl(this.backgroundImage);
        this.container.addControl(new SelectedUnitArtControl(this.unitState).render());
        this.container.addControl(new SelectedUnitTitleContainer(this.unitState).render());
        this.container.addControl(new SelectedUnitAttributesContainer(this.unitState).render());

        return this.container;
    }
}