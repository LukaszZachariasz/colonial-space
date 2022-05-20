import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';

export class SelectedUnitBackgroundContainer extends Container {
    public backgroundImage: GUI.Image;

    public render(): GUI.Control {
        this.container = new GUI.Container('selectedModelContainer');
        this.container.width = '100%';
        this.container.height = '100%';

        this.backgroundImage = new GUI.Image('background', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.container.addControl(this.backgroundImage);

        return this.container;
    }
}
