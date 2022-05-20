import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {SelectedUnitArtControl} from './selected-unit-art/selected-unit-art.control';
import {SelectedUnitTitleContainer} from './selected-unit-title/selected-unit-title.container';

export class SelectedUnitBackgroundContainer extends Container {
    public backgroundImage: GUI.Image;

    public render(): GUI.Control {
        this.container = new GUI.Container('background');
        this.container.width = '100%';
        this.container.height = '100%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.container.addControl(this.backgroundImage);
        this.container.addControl(new SelectedUnitArtControl().render());
        this.container.addControl(new SelectedUnitTitleContainer().render());

        return this.container;
    }
}
