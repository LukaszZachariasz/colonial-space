import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {IconControl} from '../../shared/icon/icon.control';
import {SelectedUnitNameControl} from './selected-unit-name/selected-unit-title.control';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class SelectedUnitTitleContainer extends Container {
    public backgroundImage: GUI.Image;

    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('title');
        this.container.width = '100%';
        this.container.height = '50px';
        this.container.left = '10px';
        this.container.top = '10px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.addControl(new IconControl('spyglass').render());
        this.container.addControl(new SelectedUnitNameControl(this.unitState).render());

        return this.container;
    }
}