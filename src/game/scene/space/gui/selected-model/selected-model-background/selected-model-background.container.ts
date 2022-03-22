import * as GUI from 'babylonjs-gui';
import {Container} from '../../container';

export class SelectedModelBackgroundContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('selectedModelContainer');
        return this.container;
    }
}
