import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-object-gui';
import {GameplayState} from '../../../game-core/game-state/gameplay-state/gameplay-state';

export class CurrentTourLabel implements GameObjectGui {
    public text: GUI.TextBlock;

    constructor(private gameplayState: GameplayState) {
    }

    public create(scene: BABYLON.Scene): GUI.Control {
        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + this.gameplayState.currentTour);
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        scene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + this.gameplayState.currentTour; // todo: check
        });

        return this.text;
    }
}