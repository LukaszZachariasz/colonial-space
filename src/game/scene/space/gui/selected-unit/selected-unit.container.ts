import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {UnitArtControl} from './unit-art/unit-art.control';
import {UnitAttributesContainer} from './unit-attributes/unit-attributes.container';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {UnitTitleContainer} from './unit-title/unit-title.container';
import {logic} from '../../../../game';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

export class SelectedUnitContainer extends Container {
    public backgroundImage: GUI.Image;
    public unitArtControl: UnitArtControl;
    public unitTitleContainer: UnitTitleContainer;
    public unitAttributesContainer: UnitAttributesContainer;
    public unitState: UnitState = selectUnitById(logic().selectedUnitService.selectedUnitId$.value);

    constructor() {
        super('selectedUnitContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.unitArtControl = new UnitArtControl(this.unitState);
        this.unitTitleContainer = new UnitTitleContainer(this.unitState);
        this.unitAttributesContainer = new UnitAttributesContainer(this.unitState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.backgroundImage);
        this.addControlToContainer(this.unitArtControl);
        this.addControlToContainer(this.unitTitleContainer);
        this.addControlToContainer(this.unitAttributesContainer);
    }

    public onApplyStyles(): void {
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
