import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../scene/space/gui/control';
import {Inject} from '../../../../../../core/injector/inject';
import {SelectionService} from '../../../selection.service';

export class SelectedModelArtControl extends Control {
    public artImage: GUI.Image;
    
    @Inject(SelectionService) private selectionService: SelectionService;

    public render(): GUI.Control {
        this.artImage = new GUI.Image('selectedModelArt', this.selectionService.selection$.value.artUrl);
        this.artImage.width = '80%';
        this.artImage.height = '30%';
        this.artImage.top = '10px';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }    
}
