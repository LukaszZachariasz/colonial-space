import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/container';

export class SelectedModelBackgroundContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('selectedModelContainer');
        this.container.width = '100%';
        this.container.height = '100%';
        this.container.background = 'black';
        this.container.alpha = 0.3;
        return this.container;
    }
}
