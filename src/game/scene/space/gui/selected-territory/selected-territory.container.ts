import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {SelectedTerritoryArtControl} from './selected-territory-art/selected-territory-art.control';
import {SelectedTerritoryTitleContainer} from './selected-territory-title/selected-territory-title.container';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

export class SelectedTerritoryContainer extends Container {
    public backgroundImage: GUI.Image;
    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    public render(): GUI.Control {
        this.container = new GUI.Container('selectedUnitContainer');
        this.container.width = '25%';
        this.container.height = '65%';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.container.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.container.addControl(this.backgroundImage);

        this.container.addControl(new SelectedTerritoryArtControl(this.territoryState).render());
        this.container.addControl(new SelectedTerritoryTitleContainer(this.territoryState).render());

        return this.container;
    }
}
