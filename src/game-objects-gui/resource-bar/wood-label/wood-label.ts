import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-object-gui';
import gameState from '../../../game-core/game-state/game-state';

export class WoodLabel implements GameObjectGui {
    public text: GUI.TextBlock;

    public create(scene: BABYLON.Scene): void {
        this.text = new GUI.TextBlock('currentWood', 'Wood: 0');
        this.text.width = '100px';
        this.text.height = '16px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        scene.registerBeforeRender(() => {
            this.text.text = 'Wood: ' + gameState.gameplayState.resourceState.wood;
        });
    }
}