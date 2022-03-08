import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../game-object-gui';
import gameStage from '../../engine/game-stage/game-stage';

export class ResourceBar implements GameObjectGui {
    public container: GUI.Container;
    public text: GUI.TextBlock;

    public create(scene: BABYLON.Scene): GUI.Container {
        this.container = new GUI.Container('resourceBar');
        this.container.width = '100px';
        this.container.height = '50px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;


        this.text = new GUI.TextBlock('currentWood', 'Wood: 0');
        this.text.width = '100px';
        this.text.height = '16px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        scene.registerBeforeRender(() => {
            this.text.text = 'Wood: ' + gameStage.gameState.resource.wood;
        });

        this.container.addControl(this.text);

        return this.container;
    }
}