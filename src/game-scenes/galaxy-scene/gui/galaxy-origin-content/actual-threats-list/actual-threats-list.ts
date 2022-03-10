import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../../../../game-objects-gui/game-object-gui';

export class ActualThreatsList implements GameObjectGui {
    public scrollViewer: GUI.ScrollViewer;

    public create(scene?: BABYLON.Scene): GUI.Control {
        this.scrollViewer = new GUI.ScrollViewer();
        this.scrollViewer.width = '300px';
        this.scrollViewer.height = '40%';
        this.scrollViewer.background = 'red';

        return this.scrollViewer;
    }
}