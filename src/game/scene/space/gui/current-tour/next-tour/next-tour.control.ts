import * as GUI from 'babylonjs-gui';
import {Control} from '../../control';
import {Inject} from '../../../../../../core/injector/inject';
import {TourService} from '../../../../../logic/tour/tour.service';

export class NextTourControl extends Control {
    public button: GUI.Button;
    
    @Inject(TourService) private tourService: TourService;

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
            this.tourService.nextTour();
        });

        return this.button;
    }
}
