import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {sceneManager} from 'engine';
import {selectCurrentTour} from '../../../../../logic/store/tour/tour.selectors';

export class CurrentTourControl extends Control<GUI.TextBlock> {
    public onCreate(): void {
        this.control = new GUI.TextBlock('currentTour', 'Current tour: ' + selectCurrentTour());
    }

    public onRegisterListeners(): void {
        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.control.text = 'Current tour: ' + selectCurrentTour();
        });
    }

    public onApplyStyles(): void {
        this.control.width = '150px';
        this.control.height = '16px';
        this.control.top = '-60px';
        this.control.color = 'red';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }
}
