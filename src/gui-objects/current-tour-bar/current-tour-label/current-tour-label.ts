import * as GUI from 'babylonjs-gui';
import {GameplayState} from '../../../game-core/game-state/gameplay-state/gameplay-state';
import {GuiObject} from '../../gui-object';

export class CurrentTourLabel extends GuiObject {
    public text: GUI.TextBlock;

    constructor(private gameplayState: GameplayState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + this.gameplayState.currentTour);
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.scene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + this.gameplayState.currentTour;
        });

        return this.text;
    }
}
