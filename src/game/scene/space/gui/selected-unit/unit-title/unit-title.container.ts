import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../shared/icon/icon.control';
import {UnitNameContainer} from './unit-name/unit-name.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitTitleContainer extends Container {
    public iconControl: IconControl;
    public unitNameContainer: UnitNameContainer;

    constructor(private unitState: UnitState) {
        super('title');
    }

    public onCreate(): void {
        super.onCreate();
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
