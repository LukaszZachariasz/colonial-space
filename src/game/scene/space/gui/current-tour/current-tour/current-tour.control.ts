import * as GUI from 'babylonjs-gui';
import {Control} from '../../control';
import {sceneManager} from 'engine';
import {store} from '../../../../../game';

export class CurrentTourControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('currentTour', 'Current tour: ' + store().tour.tour);
        this.text.width = '150px';
        this.text.height = '16px';
        this.text.top = '-60px';
        this.text.color = 'red';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.text.text = 'Current tour: ' + store().tour.tour;
        });

        return this.text;
    }
}
