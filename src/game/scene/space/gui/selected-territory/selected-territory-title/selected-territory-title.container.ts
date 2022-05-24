import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {IconControl} from '../../shared/icon/icon.control';
import {SelectedTerritoryTitleControl} from './selected-territory-name/selected-territory-title.control';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class SelectedTerritoryTitleContainer extends Container {
    public backgroundImage: GUI.Image;

    constructor(private territoryState: TerritoryState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('title');
        this.container.width = '100%';
        this.container.height = '50px';
        this.container.left = '10px';
        this.container.top = '10px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.addControl(new IconControl('planet').render());
        this.container.addControl(new SelectedTerritoryTitleControl(this.territoryState).render());

        return this.container;
    }
}
