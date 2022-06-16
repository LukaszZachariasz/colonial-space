import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {TerritoryArtControl} from './territory-art/territory-art.control';
import {TerritoryPlanetStackPanel} from './territory-planet/territory-planet.stack-panel';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryTitleContainer} from './territory-title/territory-title.container';
import {isPlanet} from '../../../../logic/store/territory/planet/is-planet';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class SelectedTerritoryStackPanel implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('selectedTerritoryStackPanel');
    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    @AppendControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendControl() public territoryTitleContainer: TerritoryTitleContainer = new TerritoryTitleContainer(this.territoryState);
    @AppendControl() public territoryArtControl: TerritoryArtControl = new TerritoryArtControl(this.territoryState);
    @AppendControl() public territoryPlanetStackPanel: TerritoryPlanetStackPanel;

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

        if (isPlanet(this.territoryState)) {
            this.territoryPlanetStackPanel = new TerritoryPlanetStackPanel(this.territoryState);
        }
    }
}
