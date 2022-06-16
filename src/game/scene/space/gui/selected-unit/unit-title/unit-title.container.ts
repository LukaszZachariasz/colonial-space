import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../shared/icon/icon.control';
import {UnitNameContainer} from './unit-name/unit-name.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitTitleContainer extends GuiContainer implements AfterCreated {
    public iconControl: IconControl;
    public unitNameContainer: UnitNameContainer;

    constructor(private unitState: UnitState) {
        super('title');
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.iconControl = new IconControl(this.unitState.icon);
        this.addControlToContainer(this.iconControl);

        this.unitNameContainer = new UnitNameContainer(this.unitState);
        this.addControlToContainer(this.unitNameContainer);
    }
}
