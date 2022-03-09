import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';

export class GalaxyNameLabel implements GameObjectGui {
    public text: GUI.TextBlock;
    public label = '';

    public create(): void {
        this.text = new GUI.TextBlock('galaxyNameLabel', this.label);
        this.text.color = 'white';
        this.text.resizeToFit = true;
        this.text.top = '20px';
        this.text.left = '10px';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}