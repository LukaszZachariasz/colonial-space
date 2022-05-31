import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/control';

export class BuildingObjectArtControl extends Control {
    public artImage: GUI.Image;

    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.artImage = new GUI.Image('art', this.buildingObjectState.artUrl);
        this.artImage.width = '70px';
        this.artImage.height = '70px';
        this.artImage.top = '10%';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }
}
