import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {StackPanel} from '../../../../../engine/gui-manager/gui-elements/advanced-controls/stack-panel/stack-panel';
import {TerritoryArtControl} from './territory-art/territory-art.control';
import {TerritoryPlanetStackPanel} from './territory-planet/territory-planet.stack-panel';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryTitleContainer} from './territory-title/territory-title.container';
import {isPlanet} from '../../../../logic/store/territory/planet/is-planet';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class SelectedTerritoryStackPanel extends StackPanel implements AfterCreated {
    public backgroundImage: GUI.Image;
    public territoryTitleContainer: TerritoryTitleContainer;
    public territoryArtControl: TerritoryArtControl;
    public territoryPlanetStackPanel: TerritoryPlanetStackPanel;

    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    constructor() {
        super('selectedTerritoryStackPanel');
    }

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.addControlToStackPanel(this.backgroundImage);

        this.territoryTitleContainer = new TerritoryTitleContainer(this.territoryState);
        this.addControlToStackPanel(this.territoryTitleContainer);

        this.territoryArtControl = new TerritoryArtControl(this.territoryState);
        this.addControlToStackPanel(this.territoryArtControl);

        if (isPlanet(this.territoryState)) {
            this.territoryPlanetStackPanel = new TerritoryPlanetStackPanel(this.territoryState);
            this.addControlToStackPanel(this.territoryPlanetStackPanel);
        }
    }
}
