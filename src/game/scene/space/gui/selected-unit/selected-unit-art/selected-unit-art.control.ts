import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {logic} from '../../../../../game';

export class SelectedUnitArtControl extends Control {
    public artImage: GUI.Image;

    public render(): GUI.Control {
        this.artImage = new GUI.Image('art', logic().selectedUnitService.selectedUnit$.value.artUrl);
        this.artImage.width = '100%';
        this.artImage.height = '70%';
        this.artImage.top = '10px';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }    
}
