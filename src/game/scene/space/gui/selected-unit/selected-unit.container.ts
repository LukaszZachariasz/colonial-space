import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {SelectedUnitBackgroundContainer} from './selected-unit-background/selected-unit-background.container';

export class SelectedUnitContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('selectedUnitContainer');
        this.container.width = '25%';
        this.container.height = '40%';
        this.container.left = '30px';
        this.container.top = '-50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.addControl(new SelectedUnitBackgroundContainer().render());

        return this.container;
    }
}
