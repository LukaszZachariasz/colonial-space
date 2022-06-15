import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {sceneManager} from 'engine';
import {selectCurrentTour} from '../../../../../logic/store/tour/tour.selectors';

@GuiElement()
export class CurrentTourControl extends Control<GUI.TextBlock> implements OnReady {
    public onCreate(): void {
        this.control = new GUI.TextBlock('currentTour', 'Current tour: ' + selectCurrentTour());
        this.control.width = '150px';
        this.control.height = '16px';
        this.control.top = '-60px';
        this.control.color = 'red';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }

    public gameOnReady(): void {
        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.control.text = 'Current tour: ' + selectCurrentTour();
        });
    }
}
