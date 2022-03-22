import * as GUI from 'babylonjs-gui';
import {Container} from '../container';
import {SelectedModelBackgroundContainer} from './selected-model-background/selected-model-background.container';

export class SelectedModelContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('selectedModelContainer');
        this.container.width = '20%';
        this.container.height = '40%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.addControl(new SelectedModelBackgroundContainer().container);

        this.container.isEnabled = false;

        return this.container;
    }
}