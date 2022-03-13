import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../gui-object';
import {TourManager} from '../../../game-core/tour/tour-manager';

export class NextTourButtonGuiObject extends GuiObject {
    public button: GUI.Button;

    constructor(private tourManager: TourManager) {
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
            this.tourManager.nextTour();
        });

        return this.button;
    }
}
