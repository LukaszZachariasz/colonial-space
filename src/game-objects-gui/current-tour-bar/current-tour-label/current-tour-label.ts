import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-object-gui';
import gameStage from '../../../engine/game-stage/game-stage';

export class CurrentTourLabel implements GameObjectGui {
    public text: GUI.TextBlock;

    public create(scene: BABYLON.Scene): void {
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
    }
}