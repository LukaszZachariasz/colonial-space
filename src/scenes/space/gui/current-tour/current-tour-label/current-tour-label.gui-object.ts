import * as GUI from 'babylonjs-gui';
import {gameState} from '../../../../../core/game-platform';
import {GuiObject} from '../../gui-object';

export class CurrentTourLabelGuiObject extends GuiObject {
    public text: GUI.TextBlock;

    constructor() {
        super();
    }

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + gameState().tour.tour);
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.scene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + gameState().tour.tour;
        });

        return this.text;
    }
}
