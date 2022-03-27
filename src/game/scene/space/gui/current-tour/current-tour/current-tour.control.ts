import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {sceneManager} from 'engine';
import {selectCurrentTour} from '../../../../../logic/store/tour/tour.selectors';

export class CurrentTourControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + selectCurrentTour());
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + selectCurrentTour();
        });

        return this.text;
    }
}
