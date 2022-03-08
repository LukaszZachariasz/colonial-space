import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../game-object-gui';
import gameStage from '../../engine/game-stage/game-stage';

export class CurrentTourBar implements GameObjectGui {
    public container: GUI.Container;
    public button: GUI.Button;
    public text: GUI.TextBlock;

    public create(scene: BABYLON.Scene): GUI.Container {
        this.container = new GUI.Container('currentTourBar');

        this.button = GUI.Button.CreateSimpleButton('nextTour', 'Next tour');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'red';
        this.button.background = 'black';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.button.onPointerUpObservable.add(() => {
           gameStage.gameState.tour.nextTour();
        });

        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + gameStage.gameState.tour.currentTour);
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        scene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + gameStage.gameState.tour.currentTour;
        });

        this.container.addControl(this.button);
        this.container.addControl(this.text);

        return this.container;
    }
}