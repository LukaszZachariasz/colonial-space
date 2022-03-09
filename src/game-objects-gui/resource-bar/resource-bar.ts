import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGuiContainer} from '../game-object-gui-container';
import {WoodLabel} from './wood-label/wood-label';

export class ResourceBar implements GameObjectGuiContainer {
    public container: GUI.Container;
    public woodLabel: WoodLabel;

    public create(scene: BABYLON.Scene): GUI.Container {
        this.container = new GUI.Container('resourceBar');
        this.container.width = '100px';
        this.container.height = '50px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.woodLabel = new WoodLabel();
        this.woodLabel.create(scene);

        this.container.addControl(this.woodLabel.text);

        return this.container;
    }
}