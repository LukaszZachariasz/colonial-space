import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';

export class SelectedTerritoryContainer extends Container {
    public backgroundImage: GUI.Image;

    public render(): GUI.Control {
        this.container = new GUI.Container('selectedUnitContainer');
        this.container.width = '25%';
        this.container.height = '65%';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.container.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.container.addControl(this.backgroundImage);

        return this.container;
    }
}
