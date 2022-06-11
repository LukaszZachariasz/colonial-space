import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {IconControl} from '../../shared/icon/icon.control';
import {UnitNameContainer} from './unit-name/unit-name.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class UnitTitleContainer extends Container {
    public iconControl: IconControl;
    public unitNameContainer: UnitNameContainer;

    constructor(private unitState: UnitState) {
        super('title');
    }

    public onCreate(): void {
        super.onCreate();
        this.iconControl = new IconControl(this.unitState.icon);
        this.unitNameContainer = new UnitNameContainer(this.unitState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.iconControl);
        this.addControlToContainer(this.unitNameContainer);
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
