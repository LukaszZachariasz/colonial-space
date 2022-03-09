import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {CurrentTourLabel} from './current-tour-label/current-tour-label';
import {GameObjectGuiContainer} from '../game-object-gui-container';
import {NextTourButton} from './next-tour-button/next-tour-button';

export class CurrentTourBar implements GameObjectGuiContainer {
    public container: GUI.Container;
    public nextTourButton: NextTourButton;
    public currentTourLabel: CurrentTourLabel;

    public create(scene: BABYLON.Scene): GUI.Container {
        this.container = new GUI.Container('currentTourBar');
        this.container.width = '200px';
        this.container.height = '150px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.nextTourButton = new NextTourButton();
        this.nextTourButton.create();

        this.currentTourLabel = new CurrentTourLabel();
        this.currentTourLabel.create(scene);

        this.container.addControl(this.nextTourButton.button);
        this.container.addControl(this.currentTourLabel.text);

        return this.container;
    }
}