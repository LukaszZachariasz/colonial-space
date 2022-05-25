import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class SelectedUnitArtControl extends Control {
    public artImage: GUI.Image;
    
    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        this.artImage = new GUI.Image('art', this.unitState.artUrl);
        this.artImage.width = '100%';
        this.artImage.height = '70%';
        this.artImage.top = '10px';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }    
}
