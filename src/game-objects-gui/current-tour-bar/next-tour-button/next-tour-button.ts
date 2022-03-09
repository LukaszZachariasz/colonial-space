import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-object-gui';
import gameStage from '../../../engine/game-stage/game-stage';

export class NextTourButton implements GameObjectGui {
    public button: GUI.Button;

    public create(): void {
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
    }
}