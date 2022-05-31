import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/control';
import {logic} from '../../../../../../../../../game';

export class BuildingObjectSelectControl extends Control {
    public button: GUI.Button;

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.button = GUI.Button.CreateSimpleButton('select', 'Start building');
        this.button.width = '100%';
        this.button.height = '30px';
        this.button.color = 'red';
        this.button.background = 'black';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.button.onPointerUpObservable.add(() => {
            logic().tourService.nextTour();
        });

        return this.button;
    }
}
