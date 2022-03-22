import * as GUI from 'babylonjs-gui';
import {Control} from '../../control';
import {logic} from '../../../../../game';

export class SelectedModelArtControl extends Control {
    public artImage: GUI.Image;

    public render(): GUI.Control {
        this.artImage = new GUI.Image('selectedModelArt', logic().selectModelManager.selected$.value.artUrl);
        this.artImage.width = '80%';
        this.artImage.height = '30%';
        this.artImage.top = '10px';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }    
}
