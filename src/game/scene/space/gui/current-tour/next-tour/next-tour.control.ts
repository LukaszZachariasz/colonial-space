import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/control';
import {logic} from '../../../../../game';

export class NextTourControl extends Control<GUI.Button> {
    public onCreate(): void {
        this.control = GUI.Button.CreateSimpleButton('nextTour', 'Next tour');
    }

    public onRegisterListeners(): void {
        this.control.onPointerUpObservable.add(() => {
            logic().tourService.nextTour();
        });
    }

    public onApplyStyles(): void {
        this.control.width = '100px';
        this.control.height = '50px';
        this.control.color = 'red';
        this.control.background = 'black';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }
}
