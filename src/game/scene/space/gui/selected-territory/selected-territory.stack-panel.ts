import * as GUI from 'babylonjs-gui';
import {StackPanel} from '../../../../../engine/gui-manager/stack-panel';
import {TerritoryArtControl} from './territory-art/territory-art.control';
import {TerritoryPlanetStackPanel} from './territory-planet/territory-planet.stack-panel';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryTitleContainer} from './territory-title/territory-title.container';
import {isTerritoryPlanet} from '../../../../logic/store/territory/planet/is-territory-planet';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

export class SelectedTerritoryStackPanel extends StackPanel {
    public backgroundImage: GUI.Image;
    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('selectedTerritoryStackPanel');
        this.stackPanel.width = '25%';
        this.stackPanel.height = '65%';
        this.stackPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.stackPanel.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
        this.stackPanel.addControl(this.backgroundImage);

        this.stackPanel.addControl(new TerritoryTitleContainer(this.territoryState).render());
        this.stackPanel.addControl(new TerritoryArtControl(this.territoryState).render());

        if (isTerritoryPlanet(this.territoryState)) {
            this.stackPanel.addControl(new TerritoryPlanetStackPanel(this.territoryState).render());
        }

        return this.stackPanel;
    }
}
