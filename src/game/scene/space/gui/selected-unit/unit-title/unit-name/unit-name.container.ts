import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

export class UnitNameContainer extends Container {
    public text: TextControl;

    constructor(private unitState: UnitState) {
        super('unitName');
    }

    public onCreate(): void {
        super.onCreate();
        this.text = new TextControl(this.unitState.name, {uppercase: true});
    }

    public onBuild(): void {
        this.addControlToContainer(this.text);
    }

    public onApplyStyles(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.left = '60px';
        this.control.adaptWidthToChildren = true;
    }
}
