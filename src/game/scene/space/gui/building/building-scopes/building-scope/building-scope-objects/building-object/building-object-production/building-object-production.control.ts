import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/control';
import {TextControl} from '../../../../../../shared/text/text.control';

export class BuildingObjectProductionControl extends Control {
    private textControl: TextControl = new TextControl(this.buildingObjectState.production.toString());

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.textControl.render();
        this.textControl.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.textControl.textBlock.left = '-5%';
        return this.textControl.textBlock;
    }
}