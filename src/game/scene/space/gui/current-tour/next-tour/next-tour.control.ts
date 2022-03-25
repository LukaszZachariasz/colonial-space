import * as GUI from 'babylonjs-gui';
import {Control} from '../../control';
import {logic} from '../../../../../game';

export class NextTourControl extends Control {
    public button: GUI.Button;

    constructor() {
        super();
    }

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('nextTour', 'Next tour');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'red';
        this.button.background = 'black';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.button.onPointerUpObservable.add(() => {
            logic().tourService.nextTour();
        });

        return this.button;
    }
}
