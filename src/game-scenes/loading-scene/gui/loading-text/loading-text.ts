import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';

export class LoadingText implements GameObjectGui {
    public text: GUI.TextBlock;

    public create(): GUI.Control {
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';

        return this.text;
    }
}