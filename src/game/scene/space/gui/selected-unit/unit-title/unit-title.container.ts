import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../shared/icon/icon.control';
import {UnitNameContainer} from './unit-name/unit-name.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitTitleContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('title');
    
    @AppendControl() public iconControl: IconControl = new IconControl(this.unitState.icon);
    @AppendControl() public unitNameContainer: UnitNameContainer = new UnitNameContainer(this.unitState);

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
