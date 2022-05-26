import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class TerritoryArtControl extends Control {
    public artImage: GUI.Image;

    constructor(private territoryState: TerritoryState) {
        super();
    }

    public render(): GUI.Control {
        this.artImage = new GUI.Image('art', this.territoryState.artUrl);
        this.artImage.width = '150px';
        this.artImage.height = '150px';
        this.artImage.top = '60px';
        this.artImage.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.artImage;
    }
}
